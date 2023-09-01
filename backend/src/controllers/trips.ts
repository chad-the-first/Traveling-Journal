import { RequestHandler } from "express";
import TripModel from "../models/trip";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";
import { Cloudinary } from "../config/cloudinary.config";


export const getTrips: RequestHandler =  async (req, res, next) => {

    try {
        const trips = await TripModel.find().exec();
        res.status(200).json(trips);
        
    } catch (error) {
        next(error);
    }
}

export const getMyTrips: RequestHandler =  async (req, res, next) => {
    const userId = req.session.userId;

    try {
        assertIsDefined(userId); 
        const trips = await TripModel.find({userId}).exec();
        res.status(200).json(trips);
        
    } catch (error) {
        next(error);
    }
}

export const getTrip: RequestHandler = async (req, res, next) => {
    const tripId = req.params.tripId;

    
    try {

        if(!mongoose.isValidObjectId(tripId)) {
            throw createHttpError(400, "invalid trip Id");
        }

        const trip = await TripModel.findById(tripId).exec();

        if(!trip) {
            throw createHttpError(404, "trip not found");
        }

        res.status(200).json(trip);
    } catch (error) {
        next(error);
    }
};

interface UpdateTripParams {
    tripId: string,
}

interface UpdateTripBody {
    image?: string,
    title?: string,
    body?: string,
    location?: string,
    route?: string,
    author?: string
}


interface createTripBody {
    image: string,
    image_Id: string,
    title: string,
    body: string,
    location?: string,
    route?: string,
    author?: string,
    votes: number,
    favs: number, 
}

export const createTrip: RequestHandler<unknown, unknown, createTripBody, unknown> = async (req, res, next) => {

    const title = req.body.title;
    const body = req.body.body;
    let author = req.body.author;
    const location = req.body.location;
    const route = req.body.route;
    const votes = 0;
    const favs = 0;
    const userId = req.session.userId;


    try {
        assertIsDefined(userId); 

        if (!title || !body) {
            throw createHttpError(400, "The trip must have a title and a body")
        }
        if (!author) {
            const username = await UserModel.findById(req.session.userId);
            author = username?.username;
        } else {
            author = "Anonymous";
        }
        // checking avatar/files
        if(req.files && typeof req.files.length == "number" && req.files.length > 0){
            const files= req.files as Express.Multer.File[]
            // use cloudinary.uploader.upload() to upload image in cloudinary
            const result = await Cloudinary.uploader.upload(files[0].path, {
                width: 1280, // setting width to 200px
                height: 720, // setting height to 200px
                crop: "thumb", // create thumbnail image
                // gravity: "face", // focusing on face
                folder: "trips avatar",
            });
    

            const newTrip = await TripModel.create({
                userId: userId,
                image: result.secure_url,
                image_Id: result.public_id,
                title: title,
                body: body,
                author: author,
                location: location,
                route: route,
                meta: {
                    votes: votes,
                    favs: favs,
                }
            });
            res.status(201).json(newTrip);
        } else {
            const newTrip = await TripModel.create({
                userId: userId,
                title: title,
                body: body,
                author: author,
                location: location,
                route: route,
                meta: {
                    votes: votes,
                    favs: favs,
                }
            });
            res.status(201).json(newTrip);
        }
         
    } catch (error) {
        next(error);
    }
}

    export const updateTrip: RequestHandler<UpdateTripParams, unknown, UpdateTripBody, unknown> = async (req, res ,next) => {
        const tripId = req.params.tripId;
        const userId = req.session.userId;

        const newTitle = req.body.title;
        const newBody = req.body.body;
        const newAuthor = req.body.author;
        const newLocation = req.body.location;
        const newRoute = req.body.route;

        
        try {
            assertIsDefined(userId); 

            if(!mongoose.isValidObjectId(tripId)) {
                throw createHttpError(400, "invalid trip Id");
            }
            
            if (!newTitle || !newBody) {
                throw createHttpError(400, "The trip must have a title and a body")
            }
    
            const trip = await TripModel.findById(tripId).exec();
    
            if(!trip) {
                throw createHttpError(404, "trip not found");
            }

            if(!trip.userId.equals(userId)) {
                throw createHttpError(401, " You naughty naughty, your don't have access to this note.");
            }

            trip.title = newTitle;
            trip.body = newBody;
            trip.author = newAuthor;
            trip.location = newLocation;
            trip.route = newRoute;
    
            const updatedTrip = await trip.save();
            res.status(200).json(updatedTrip);
        } catch (error) {
            next(error);
        }
    }

export const deleteTrip: RequestHandler = async (req, res, next) => {
    const tripId = req.params.tripId;
    const userId = req.session.userId;


    try {
        assertIsDefined(userId); 

        if(!mongoose.isValidObjectId(tripId)) {
            throw createHttpError(400, "invalid trip Id");
        }

        const trip = await TripModel.findById(tripId).exec();

        if(!trip) {
            throw createHttpError(404, "trip not found");
        }
        if(!trip.userId.equals(userId)) {
            throw createHttpError(401, " You naughty naughty, your don't have access to this note.");
        }
        if(trip.image && trip.image_Id) {
            await Cloudinary.uploader.destroy(trip.image_Id);
        }

        await trip.deleteOne();
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}