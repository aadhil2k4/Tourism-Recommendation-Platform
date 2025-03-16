import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    destinationName: { type: String, required: true }, 
    country: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    climateType: { type: String },
    bestVisitingSeason: { type: String },
    recommendedFor: { type: String },
    activityTypes: { type: [String] }, 
    nearbyAttractions: { type: [String] }, 
    budgetLevel: { type: String, enum: ["Low", "Medium", "High"] },
    averageCostPerNight: { type: Number }, 
    localTransport: { type: [String] }, 
    airportProximity: { type: String }, 
    visaRequirements: { type: String },
    crimeIndex: { type: String, enum: ["Low", "Medium", "High"] },
    healthSafetyWarnings: { type: String },
    languageSpoken: { type: String },
    culturalConsiderations: { type: String },
    userRatings: { type: Number, min: 0, max: 5 }, 
    numberOfReviews: { type: Number },
    socialMediaMentions: { type: Number },
    eventFestivals: { type: [String] }, 
    image: { type: String }, 
  },
  { timestamps: true }
);

export const Destination = mongoose.model('Destination', destinationSchema);
