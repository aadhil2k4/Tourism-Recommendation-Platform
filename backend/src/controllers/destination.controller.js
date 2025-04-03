import { Destination } from "../models/destination.model.js";
import { userResponse } from "../models/userResponse.model.js";

export const getDestinations = async (req, res) => {
  try {
    const userId = req.userId; // Ensure req.userId is set from middleware/authentication
    const userPreferences = await userResponse.findOne({ userId });

    let filter = {}; // Default to an empty filter (fetch all if no preferences)

    if (userPreferences && userPreferences.answers.length > 0) {
      const selectedOptions = userPreferences.answers.map(answer => answer.selectedOption);

      filter = {
        $or: [
          { "Climate Type": { $in: selectedOptions } }, // Matches climate preferences
          { "Best Visiting Season": { $in: selectedOptions } },
          { "Budget Level": { $in: selectedOptions } },
          { "Crime Index": { $in: selectedOptions } }, // Matches crime index
        ],
      };
    }

    const limit = parseInt(req.query.limit) || 9;
    const page = parseInt(req.query.page) || 1;

    const destinations = await Destination.find(filter)
      .select({
        "Destination Name": 1,
        Country: 1,
        Image: 1,
        "User Ratings (out of 5)": 1,
        Latitude: 1,
        Longitude: 1,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error); // Log errors for debugging
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

export const searchDestination = async(req, res) => {
  try {
    const q = req.query.q || "";
    const destinations = await Destination.find({
      $or: [
        { "Destination Name": { $regex: q, $options: "i" } }, 
        { Country: { $regex: q, $options: "i" } }
      ]
    });
    return res.status(200).json({ destinations });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
