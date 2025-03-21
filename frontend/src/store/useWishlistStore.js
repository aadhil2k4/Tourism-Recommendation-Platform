import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { toast } from 'react-hot-toast';

export const useWishlistStore = create((set) => ({
    wishlist: [],
    error: null,

    getWishList: async() => {
        set({error: null});
        try {
            const res = await axiosInstance.get("/wishlist");
            set({wishlist: res.data.wishlist});
        } catch (error) {
            set({error: error.message});
            console.log("Error in getting wishlist: ", error.message);
        }
    },

    addToWishList: async(destinationId) => {
        set({error: null});
        try {
            await axiosInstance.post("/wishlist/add", { destinationId });
            set((state) => ({ wishlist: [...state.wishlist, destinationId] }));
            toast.success("Added to wishlist");
        } catch (error) {
            set({error: error.message});
            toast.error("Didn't add to wishlist");
            console.log("Error in getting wishlist: ", error.message);
        }
    },

    removeFromWishlist: async(destinationId) => {
        set({error: null});
        try {
            await axiosInstance.post("/wishlist/remove", { destinationId });
            set((state) => ({
                wishlist: state.wishlist.filter(item => item._id !== destinationId)
            }));
            toast.success("Removed from WishList");
        } catch (error) {
            set({error: error.message});
            toast.error("Couldn't remove from wishlist");
            console.log("Error in getting wishlist: ", error.message);
        }
    }
}))