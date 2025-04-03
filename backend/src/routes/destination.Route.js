import express from "express";
import { getDestinations, getDestinationById, searchDestination, getUserDetails } from "../controllers/destination.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get('/allDestinations', protectRoute, getDestinations);

router.get('/destinationById/:id', protectRoute, getDestinationById);

router.get("/search", protectRoute, searchDestination);

router.get("/userDetails", protectRoute, getUserDetails);

export default router;