import { Quiz } from "../models/quizQuestion.model.js"
import { userResponse } from "../models/userResponse.model.js";
import { User } from "../models/user.model.js";

export const getQuestions = async(req, res) => {
    try {
        const questions = await Quiz.find();
        res.json(questions);
    } catch (error){
        res.status(500).json({error: "Failed to fetch questions"});
    }
}

export const userAnswers = async (req, res) => {
    const userId = req.userId;
    const { answers } = req.body;

    try {
        if (!answers || answers.length === 0) {
            return res.status(400).json({ success: false, message: "Answers are required" });
        }
        const existingResponse = await userResponse.findOne({ userId });

        if (existingResponse) {
            existingResponse.answers = answers;
            await existingResponse.save();
            res.status(200).json({ success: true, message: "Answers updated successfully" });
        } else {
            const newUserResponse = new userResponse({ userId, answers });
            await newUserResponse.save();
            await User.findOneAndUpdate(
                { _id: userId },
                { $set: { quizTaken: true } },
                { new: true }
            );
            res.status(200).json({ success: true, message: "Answers saved successfully" });
        }
    } catch (error) {
        console.log("Error while saving answers: ", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
