import { Destination } from "../models/destination.model.js";

export const getDestinations = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;
    const destinations = await Destination.find().select({
      "Destination Name": 1,
      Country: 1,
      Image: 1,
      "User Ratings (out of 5)": 1,
    })
    .skip((page-1)*limit)
    .limit(limit);
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);
    if(!destination){
      return res.status(404).json({success: false, message: "Destination Not Found"});
    }
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
