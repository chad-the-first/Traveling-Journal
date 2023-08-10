import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {

    try {
        const username = await UserModel.findById(req.session.userId).select("+email").exec();
        res.status(201).json(username);
    } catch (error) {
        next(error)
    }
}

interface SignupProps {
    username: string,
    email: string,
    password: string 
}


export const signUp: RequestHandler<unknown, unknown, SignupProps, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    
    try {
        if (!username || !email || !password) {
            throw createHttpError(400, "All parameters are required.")
        }

        const unavailableUsername = await UserModel.findOne({ username: username}).exec();
        if (unavailableUsername) {
            throw createHttpError(409, "Username already exists, try login in instead.");
        }

        const unavailableEmail = await UserModel.findOne({ email: email }).exec();
        if (unavailableEmail) {
            throw createHttpError(409, "Email already exists, try login in instead.")
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed
        });
        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error)
    }
}

interface LoginProps {
    username: string,
    password: string
}

export const login: RequestHandler<unknown, unknown, LoginProps, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "All parameters are required.")
        }

        const user = await UserModel.findOne({username: username}).select("+password +email").exec();
        if(!user) {
            throw createHttpError(400, "Invalid credentials")
        }
        const validUser = await bcrypt.compare(password, user.password);
        if(!validUser) {
            throw createHttpError(400, "Invalid credentials")
        }

        req.session.userId = user._id;
        res.status(201).json(user);

        
    } catch (error) {
        next(error)
    }
}

export const logOut: RequestHandler =async (req, res, next) => {
    try {
        req.session.destroy(error => {
            if(error) {
                next(error);
            } else {
                res.sendStatus(200);
            }
        });
    } catch (error) {
        next(error);
    }
}