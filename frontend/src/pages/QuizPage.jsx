import { useQuizStore } from "../store/useQuizStore"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const QuizPage = () => {

  const navigate = useNavigate();
  const { getQuiz, questions, isLoading, submitQuiz } = useQuizStore();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getQuiz();
  }, [])

  if(isLoading){
    return <p>Loading Quiz...</p>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all questions are answered
    if (answers.length < questions.length) {
        toast.error("Please answer all questions before submitting");
        return;
    }
    
    await submitQuiz(answers);
    navigate("/dashboard/destinations");
  }

  const handleChange = (questionId, selectedOption) => {
    setAnswers(prev => {
      // Check if an answer for this question already exists
      const existingAnswerIndex = prev.findIndex(answer => answer.questionId === questionId);
      
      if (existingAnswerIndex >= 0) {
        // Update existing answer
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { questionId, selectedOption };
        return newAnswers;
      } else {
        // Add new answer
        return [...prev, { questionId, selectedOption }];
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl text-center mb-6 font-bold">Quiz Page</h1>

      {questions.length === 0 ? (
        <p className="text-gray-500 text-center">No quiz available</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question, index) => (
            <div key={question._id} className="p-4 border rounded-lg shadow-md">
              <h2 className="font-bold text-lg mb-2">
                {index + 1}. {question.question}
              </h2>

              <div className="flex space-x-4">
                {question.options.map((option) => (
                  <label
                  key={option._id}
                  className={`border p-2 rounded-md cursor-pointer flex items-center space-x-2 ${
                    answers.some(answer => 
                      answer.questionId === question._id && answer.selectedOption === option.optionText
                    ) ? "border-blue-500 bg-blue-100" : "border-gray-300"
                  }`}
                  >
                    <input
                      type="radio"
                      name={question._id}
                      value={option.optionText}
                      checked={answers.some(answer => 
                        answer.questionId === question._id && answer.selectedOption === option.optionText
                      )}
                      onChange={() => handleChange(question._id, option.optionText)}
                      className="hidden"
                    />
                    <span>{option.optionText}</span> {/* ✅ Display option text */}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  )
}

export default QuizPage