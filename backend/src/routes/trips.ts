import express from "express";
import * as TripsController from "../controllers/trips";
import { requiresAuth, requiresAuthForUpdate } from "../middleware/auth";

const router = express.Router();

router.get("/", TripsController.getTrips);

// add requireAuth later and see what's the issue, its something that has to do with using axios instead of regular fetch
router.get("/my-trips/", requiresAuth, TripsController.getMyTrips);

router.get("/:tripId", TripsController.getTrip);

router.post("/", requiresAuth, TripsController.createTrip);

router.patch("/:tripId", requiresAuthForUpdate, TripsController.updateTrip);

router.delete("/:tripId", requiresAuth, TripsController.deleteTrip);

export default router;