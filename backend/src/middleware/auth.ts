import { RequestHandler } from "express";
import createHttpError from "http-errors";

interface UpdateTripParams {
    tripId: string,
}

export const requiresAuthForUpdate: RequestHandler<UpdateTripParams, unknown, unknown, unknown> = (req, res, next) => {
    if(req.session.userId) {
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
}

export const requiresAuth: RequestHandler = (req, res, next) => {
    if(req.session.userId) {
        console.log(req.session);
        next();
    } else {
        console.log(req.session);
        next(createHttpError(401, "User not authenticated"));
    }
}