import { create } from "zustand";
import axios from "axios";

const API_KEY = import.meta.env.VITE_HOTEL_API_KEY;

export const useHotelStore = create((set) => ({
    hotels: [],
    error: null,
    isLoading: false,

    getHotels: async ({place, inDate,outDate}) => {
        set({isLoading: true, error:null});
        try{
            const res = await axios.get(`https://serpapi.com/search.json?engine=google_hotels&q=${place}&check_in_date=${inDate}&check_out_date=${outDate}&adults=2&currency=USD&gl=us&hl=en`)
            if(res.data && res.data.results){
                set({isLoading: false, hotels: res.data.results});
            } else {
                set({ error: "No hotels found", isLoading: false });
            }
        } catch (error) {
            set({ error: error || "Failed to fetch hotels", isLoading: false });
        }
    }

}))

