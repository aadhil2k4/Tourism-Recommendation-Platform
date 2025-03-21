import { User } from "../models/user.model.js";
import { Destination } from "../models/destination.model.js";

export const addWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { destinationId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.wishlist.includes(destinationId)) {
      user.wishlist.push(destinationId);
      await user.save();
    }
    res
      .status(200)
      .json({
        message: "Destination added to wishlist",
        wishlist: user.wishlist,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWishList = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("wishlist");
    console.log("Wishlist from DB:", user.wishlist);
    const wishlistDetails = await Promise.all(
      user.wishlist.map(async (destinationId) => {
        return await Destination.findById(destinationId).select({
          "Destination Name": 1,
          Country: 1,
          Image: 1,
          "User Ratings (out of 5)": 1,
        });
      })
    );
    res.status(200).json({ wishlist: wishlistDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeWishList = async (req, res) => {
  try {
    const userId = req.userId;
    const { destinationId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not found" });
    }
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== destinationId
    );
    await user.save();
    res
      .status(200)
      .json({
        message: "Destination removed from WishList",
        wishlist: user.wishlist,
      });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
