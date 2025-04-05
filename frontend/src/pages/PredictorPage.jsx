import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PredictorPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [count, setCount] = useState(0);
  const navigate = useNavigate()

  const handleSubmit = () => {
    if(count < 6 ){
      toast.error("Select all fields");
      return
    }
    const tripIds = [
      "67d703ef43dacbd88cfbb5d2",
      "67d703ef43dacbd88cfbb6c7",
      "67d703ef43dacbd88cfbb6bc",
      "67d703ef43dacbd88cfbb7bb",
      "67d703ef43dacbd88cfbb6da",
      "67d703ef43dacbd88cfbb7c1",
      "67d703ef43dacbd88cfbb832",
      "67d703ef43dacbd88cfbb600",
      "67d703ef43dacbd88cfbb61f",
      "67d703ef43dacbd88cfbb813",
      "67d703ef43dacbd88cfbb58e",
    ];
    const trip = tripIds[Math.floor(Math.random() * tripIds.length)]; 
    navigate(`/dashboard/destinations/${trip}`)
  }

  const questions = [
    {
      question: "What excites you the most about traveling?",
      options: [
        { label: "Exploring historical sites and cultural landmarks", icon: "🏛️" },
        { label: "Relaxing on a beach with a cocktail", icon: "🍹" },
        { label: "Adventurous activities like hiking or scuba diving", icon: "⛰️" },
        { label: "Experiencing nightlife and city vibes", icon: "🌆" }
      ],
    },
    {
      question: "Which climate do you prefer for your trips?",
      options: [
        { label: "Warm and sunny", icon: "☀️" },
        { label: "Cold and snowy", icon: "❄️" },
        { label: "Mild and pleasant", icon: "🍃" },
        { label: "Tropical and humid", icon: "🌴" }
      ],
    },
    {
      question: "What’s your go-to vacation activity?",
      options: [
        { label: "Food tours and trying new cuisines", icon: "🍜" },
        { label: "Hiking and outdoor adventures", icon: "⛰️" },
        { label: "Visiting museums and cultural sites", icon: "🏛️" },
        { label: "Shopping and experiencing city life", icon: "🛍️" }
      ],
    },
    {
      question: "Who do you usually travel with?",
      options: [
        { label: "Solo traveler", icon: "🧳" },
        { label: "Partner or spouse", icon: "💑" },
        { label: "Family with kids", icon: "👨‍👩‍👦" },
        { label: "Friends or a group", icon: "👫" }
      ],
    },
    {
      question: "What type of adventure do you enjoy most?",
      options: [
        { label: "Water-based activities (snorkeling, surfing, kayaking)", icon: "🌊" },
        { label: "Mountain-based activities (skiing, trekking, climbing)", icon: "🏔️" },
        { label: "Wildlife safaris and nature exploration", icon: "🦁" },
        { label: "Urban adventures and exploring new cultures", icon: "🏙️" }
      ],
    },
    {
      question: "What kind of traveler are you?",
      options: [
        { label: "Cultural explorer—love history, museums, and traditions", icon: "🏺" },
        { label: "Relaxation seeker—prefer spa days and beach lounging", icon: "🏖️" },
        { label: "Adventure junkie—always looking for thrill and action", icon: "🎢" },
        { label: "Social traveler—love meeting new people and nightlife", icon: "🎉" }
      ],
    },
  ]
  ;

  const handleSelection = (question, option) => {
    setSelectedOptions({ ...selectedOptions, [question]: option });
    setCount(count+1)
  };

  return (
    <div className="p-3 max-w-4xl mx-auto">
      <header className="text-center text-4xl font-bold rounded-lg mb-6">
        Select options to Predict your ideal Trip
      </header>
      {questions.map((q, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{q.question}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {q.options.map((option, i) => (
              <button
                key={i}
                className={`border p-4 rounded-lg text-center transition-all hover:bg-gray-100 cursor-pointer ${
                  selectedOptions[q.question] === option.label
                    ? "border-blue-500 bg-gray-100 text-black" : "border-gray-300"
                }`}
                onClick={() => handleSelection(q.question, option.label)}
              >
                <span className="text-2xl">{option.icon}</span>
                <p className="mt-2">{option.label}</p>
              </button>
            ))}
          </div>
        </div>
      ))
      }
      <div className="flex justify-center items-center">
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Suggest Trip
        </button>
    </div>
    </div>
  );
};

export default PredictorPage;