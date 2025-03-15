import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
    },
  ],
});

export const userResponse = mongoose.model("userResponse", responseSchema);
