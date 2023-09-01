import express from "express";
import * as TripsController from "../controllers/trips";
import { requiresAuth, requiresAuthForUpdate } from "../middleware/auth";
import { avatarUpload } from "../middleware/avatarUpload";

const router = express.Router();

router.get("/", TripsController.getTrips);

router.get("/my-trips/", requiresAuth, TripsController.getMyTrips);

router.get("/:tripId", TripsController.getTrip);

router.post("/", requiresAuth, avatarUpload, TripsController.createTrip);

router.patch("/:tripId", requiresAuthForUpdate, TripsController.updateTrip);

router.delete("/:tripId", requiresAuth, TripsController.deleteTrip);

export default router;