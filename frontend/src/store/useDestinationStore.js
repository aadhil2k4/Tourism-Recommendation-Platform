import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useDestinationStore = create((set, get) => ({
    destinations: [],
    isLoading: false,
    error: null,
    page: 1,
    hasMore: true,

    getDestinations: async() => {
        const { page, hasMore, destinations, isLoading } = get();
        if(!hasMore || isLoading) return;
        set({isLoading: true});
        try {
            const res = await axiosInstance.get(`/destinations/allDestinations`, {params: {limit:9, page}});
            console.log("API Response:", res.data);
            console.log(`Fetched Page ${page}:`, res.data);
            if(res.data.length < 9){
                set({hasMore: false});
            }
            const existingIds = new Set(destinations.map(dest => dest._id));
            const newDestinations = res.data.filter(dest => !existingIds.has(dest._id));

            if (newDestinations.length === 0) {
                set({ isLoading: false });
                return;
            }
            set((state) => ({
                destinations: [...state.destinations, ...newDestinations],
                page: state.page+1,
                isLoading: false
            }))
        } catch (error) {
            set({error: error.response.data.message || "Error fetching destinations", isLoading: false});

        }
    }
}))