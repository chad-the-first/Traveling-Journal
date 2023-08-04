import express from "express";
import * as TripsController from "../controllers/trips";

const router = express.Router();

router.get("/", TripsController.getTrips);

router.get("/:tripId", TripsController.getTrip);

router.post("/", TripsController.createTrip);

router.patch("/:tripId", TripsController.updateTrip);

router.delete("/:tripId", TripsController.deleteTrip);

export default router;