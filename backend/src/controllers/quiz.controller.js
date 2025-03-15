import { Quiz } from "../models/quizQuestion.model.js"
import { userResponse } from "../models/userResponse.model.js";

export const getQuestions = async(req, res) => {
    try {
        const questions = await Quiz.find();
        res.json(questions);
    } catch (error){
        res.status(500).json({error: "Failed to fetch questions"});
    }
}

export const userAnswers = async(req, res) => {
    const userId = req.userId;
    const { answers} = req.body;
    try {
        if (!answers || answers.length === 0) {
            return res.status(400).json({ success: false, message: "Answers are required" });
        }
        const userAnswers = new userResponse({userId, answers});
        await userAnswers.save();
        res.status(200).json({success: true, message: "Answers saved successfully"});
    } catch (error) {
        console.log("Error while saving answers: ", error);
        res.status(500).json({success: false, error: error.message})
    }
}