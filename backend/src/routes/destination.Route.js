import express from "express";
import { getDestinations, getDestinationById } from "../controllers/destination.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get('/allDestinations', protectRoute, getDestinations);
router.get('/destinationById/:id', protectRoute, getDestinationById);

export default router;