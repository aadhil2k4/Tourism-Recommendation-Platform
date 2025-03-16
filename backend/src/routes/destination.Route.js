import express from "express";
import { getDestinations } from "../controllers/destination.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get('/allDestinations', protectRoute, getDestinations);

export default router;