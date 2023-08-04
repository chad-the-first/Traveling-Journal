import { RequestHandler } from "express";
import TripModel from "../models/trip";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getTrips: RequestHandler =  async (req, res, next) => {
    try {
        const trips = await TripModel.find().exec();
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
    title?: string,
    body?: string,
    author?: string
}


interface createTripBody {
    title: string,
    body: string,
    author?: string,
    votes: number,
    favs: number, 
}

export const createTrip: RequestHandler<unknown, unknown, createTripBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;
    const author = req.body.author;
    const votes = 0;
    const favs = 0;

    try {
        if (!title || !body) {
            throw createHttpError(400, "The trip must have a title and a body")
        }

        const newTrip = await TripModel.create({
            title: title,
            body: body,
            author: author,
            meta: {
                votes: votes,
                favs: favs,
            }
        });

        res.status(201).json(newTrip);
        
    } catch (error) {
        next(error);
    }
}

    export const updateTrip: RequestHandler<UpdateTripParams, unknown, UpdateTripBody, unknown> = async (req, res ,next) => {
        const tripId = req.params.tripId;
        const newTitle = req.body.title;
        const newBody = req.body.body;
        const newAuthor = req.body.author;
        
        try {
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
    
            trip.title = newTitle;
            trip.body = newBody;
            trip.author = newAuthor;
    
            const updatedTrip = await trip.save();
            res.status(200).json(updatedTrip);
        } catch (error) {
            next(error);
        }
    }

export const deleteTrip: RequestHandler = async (req, res, next) => {
    const tripId = req.params.tripId;

    try {
        if(!mongoose.isValidObjectId(tripId)) {
            throw createHttpError(400, "invalid trip Id");
        }

        const trip = await TripModel.findById(tripId).exec();

        if(!trip) {
            throw createHttpError(404, "trip not found");
        }

        await trip.deleteOne();
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}