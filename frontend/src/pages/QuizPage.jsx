import React, { useState } from "react";

const TravelPreferences = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

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
      question: "How do you usually plan your trips?",
      options: [
        { label: "I love detailed itineraries", icon: "📅" },
        { label: "I go with the flow and decide on the spot", icon: "🎒" },
        { label: "I prefer a mix of planned and spontaneous activities", icon: "🔄" },
        { label: "I let travel agencies or apps plan it for me", icon: "🏷️" }
      ],
    },
    {
      question: "What’s your ideal accommodation?",
      options: [
        { label: "Luxury hotel with all amenities", icon: "🏨" },
        { label: "Cozy cabin or countryside retreat", icon: "🏡" },
        { label: "Budget-friendly hostel or Airbnb", icon: "🛏️" },
        { label: "Unique stays like treehouses or overwater bungalows", icon: "🌿" }
      ],
    },
    {
      question: "How do you like to explore a new city?",
      options: [
        { label: "Walking or biking around", icon: "🚶‍♂️🚲" },
        { label: "Taking guided tours and learning about history", icon: "🏰" },
        { label: "Trying local transportation (buses, trains, tuk-tuks)", icon: "🚋" },
        { label: "Renting a car for road trips", icon: "🚗" }
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
      question: "What’s your dream travel destination?",
      options: [
        { label: "A European cultural hub like Paris or Rome", icon: "🏰" },
        { label: "A tropical paradise like the Maldives or Bali", icon: "🌊" },
        { label: "A nature retreat like the Swiss Alps or Patagonia", icon: "🏔️" },
        { label: "A bustling city like Tokyo or New York", icon: "🌆" }
      ],
    },
    {
      question: "How do you prefer to experience local cuisine?",
      options: [
        { label: "Fine dining restaurants", icon: "🍽️" },
        { label: "Street food and local markets", icon: "🌮" },
        { label: "Cooking classes or food tours", icon: "🥘" },
        { label: "Anything new—I love trying unique dishes", icon: "🍣" }
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
      question: "How long is your ideal trip?",
      options: [
        { label: "A weekend getaway", icon: "🏕️" },
        { label: "One to two weeks for full exploration", icon: "🏝️" },
        { label: "A month-long slow travel experience", icon: "🗺️" },
        { label: "As long as possible—I love extended travel!", icon: "✈️" }
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
    {
      question: "What’s your favorite mode of travel?",
      options: [
        { label: "Flights—quick and efficient", icon: "✈️" },
        { label: "Trains—scenic and relaxing", icon: "🚆" },
        { label: "Road trips—freedom to explore", icon: "🚙" },
        { label: "Cruises—ocean adventures and luxury", icon: "🚢" }
      ],
    },
    {
      question: "What is a dealbreaker for you when traveling?",
      options: [
        { label: "Crowded and overly touristy places", icon: "🏟️" },
        { label: "Extreme weather conditions", icon: "🌪️" },
        { label: "Lack of good food options", icon: "🍽️" },
        { label: "Poor connectivity or WiFi issues", icon: "📶" }
      ],
    },
    {
      question: "How do you like to remember your travels?",
      options: [
        { label: "Taking lots of photos and videos", icon: "📸" },
        { label: "Buying souvenirs and local crafts", icon: "🏺" },
        { label: "Writing travel journals or blogs", icon: "📝" },
        { label: "Sharing experiences with friends and family", icon: "🎤" }
      ],
    }
  ]
  ;

  const handleSelection = (question, option) => {
    setSelectedOptions({ ...selectedOptions, [question]: option });
  };

  return (
    <div className="p-3 max-w-4xl mx-auto">
      <header className="text-center text-4xl font-bold rounded-lg mb-6">
        Travel Preferences Quiz
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
        <button type="submit" className="btn btn-primary">
          Submit Quiz
        </button>
    </div>
    </div>
  );
};

export default TravelPreferences;
