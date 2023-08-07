import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.post("/", UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logOut);

export default router;