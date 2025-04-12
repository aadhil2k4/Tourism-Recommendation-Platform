import { trainTFIDF, getContentBasedScores } from "../utils/contentBased.js";
import { trainCollabModel } from "../utils/collaborativeBased.js";
import { Destination } from "../models/destination.model.js";
import { User } from "../models/user.model.js";
import tf from "@tensorflow/tfjs-node";

let collabModel = null;
let destinations = [];
let userIndexMap = [];
let destinationIdMap = []; // This will hold destination IDs in the order they appear

export const initializeModel = async (userId) => {
  // Load and validate destinations
  destinations = await Destination.find().lean();
  if (destinations.length === 0) {
    throw new Error("No destinations with tags found");
  }
  
  // Create an ordered list of destination IDs for mapping
  destinationIdMap = destinations.map(d => d._id.toString());

  // Load user data
  const allUsers = await User.find().lean();
  const wishlists = allUsers.map(u => ({
    userId: u._id.toString(),
    destinationIds: u.wishlist?.map(id => id.toString()) || []
  }));

  userIndexMap = wishlists.map(w => w.userId);

  // Train models
  trainTFIDF(destinations);
  collabModel = await trainCollabModel(wishlists, destinationIdMap);
};

export const getHybridRecommendations = async (userId, preferredTags) => {
    try {
      // 1. Ensure models are initialized
      if (!collabModel || destinations.length === 0) {
        await initializeModel(userId);
      }
  
      // 2. Get content-based scores
      const cbScores = getContentBasedScores(preferredTags || []);
  
      // 3. Get collaborative scores
      const userIdx = userIndexMap.indexOf(userId.toString());
      if (userIdx === -1) {
        console.warn(`User ${userId} not found in model - falling back to content-based`);
        return getContentBasedFallback(preferredTags);
      }
  
      const userInput = tf.tensor1d([userIdx], 'int32');
      const cfPredictions = collabModel.predict(userInput);
      const cfScores = await cfPredictions.data();
      tf.dispose([userInput, cfPredictions]);
  
      // 4. Combine scores and map to full destination data
      const recommendations = destinations.map((dest, i) => ({
        ...dest.toObject ? dest.toObject() : dest,
        score: (0.7 * cbScores[i]) + (0.3 * cfScores[i])
      })).sort((a, b) => b.score - a.score);
  
      // 5. Select only needed fields for frontend
      return recommendations.map(d => ({
          _id: d._id,
          name: d["Destination Name"],
          country: d.Country,
          image: d.Image || d.image,
          rating: d["User Ratings (out of 5)"],
          score: d.score,
          latitude: d.Latitude,
          longitude: d.Longitude,
          // Optionally include any other properties you need
          ...d 
        }));
  
    } catch (error) {
      console.error("Recommendation error:", error);
      return getPopularFallback(); // Fallback to popular destinations
    }
};

const getContentBasedFallback = async (preferredTags) => {
  const cbScores = getContentBasedScores(preferredTags || []);
  return destinations.map((d, i) => ({
    ...d.toObject(),
    score: cbScores[i]
  })).sort((a, b) => b.score - a.score).slice(0, 12);
};

const getPopularFallback = async () => {
  return await Destination.find()
    .sort({ "User Ratings (out of 5)": -1 })
    .limit(60)
    .lean();
};
