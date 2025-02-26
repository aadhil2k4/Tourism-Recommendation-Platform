import express from "express";
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login)

router.post("/logout", logout)

router.post("/verifyEmail", verifyEmail);

router.get("/checkAuth", protectRoute, checkAuth)

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword/:token", resetPassword);

export default router;