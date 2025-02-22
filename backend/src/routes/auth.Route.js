import express from "express";
import { signup, login, logout, verifyEmail, forgotPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login)

router.post("/logout", logout)

router.post("/verifyEmail", verifyEmail);

router.post("/forgotPassword", forgotPassword);

//router.post("/resetPassword", resetPassword);

export default router;