import express from "express";
import { getQuestions } from "../controllers/quiz.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/getQuiz", protectRoute, getQuestions);

export default router;
