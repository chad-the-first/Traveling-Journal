import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import tripsRoutes from "./routes/trips";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnve";
import MongoStore from "connect-mongo";

const app = express();

app.use(cors({credentials: true, origin: true}));

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 1000,
        path: "/",
    },
    rolling: true,
    proxy: true,
    store: MongoStore.create({
        mongoUrl: env.MONGODB_URI
    })
}))

app.use("/api/users", userRoutes);
app.use("/api/trips", tripsRoutes);


 
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "Unkown error";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error: errorMessage})
})

export default app;