import express from "express";
import { getQuestions, userAnswers } from "../controllers/quiz.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/getQuiz", protectRoute, getQuestions);

router.post("/submitQuiz", protectRoute, userAnswers);

export default router;
