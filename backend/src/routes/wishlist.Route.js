import express from "express";
import { addWishlist, getWishList, removeWishList } from "../controllers/wishlist.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/', protectRoute, getWishList);

router.post("/add", protectRoute, addWishlist);

router.post("/remove", protectRoute, removeWishList);

export default router;