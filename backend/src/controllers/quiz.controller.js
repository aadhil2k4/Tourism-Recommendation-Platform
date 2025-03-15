import { Quiz } from "../models/quizQuestion.model.js"

export const getQuestions = async(req, res) => {
    try {
        const questions = await Quiz.find();
        res.json(questions);
    } catch (error){
        res.status(500).json({error: "Failed to fetch questions"});
    }
}