import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: [{
        optionText: {
            type: String, 
            required: true,
        },
        optionValue: {
            type: Number,
        }
    }],
    weight: {
        type: Number,
        default: 1,
    }
})

export const Quiz = mongoose.model('Quiz', quizSchema);