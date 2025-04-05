import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPin, allPins } from "../controllers/pin.controller.js";

const router = express.Router()

router.post("/", protectRoute, createPin);

router.get("/", protectRoute, allPins);

export default router;