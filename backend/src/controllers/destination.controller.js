import { Destination } from "../models/destination.model.js";

export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().select({
      "Destination Name": 1,
      Country: 1,
      Image: 1,
      "User Ratings (out of 5)": 1,
    });
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDestinationById = async (req, res) => {
  try {
  } catch (error) {}
};
