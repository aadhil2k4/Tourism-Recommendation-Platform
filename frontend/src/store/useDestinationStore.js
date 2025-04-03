import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useDestinationStore = create((set, get) => ({
    destinations: [],
    isLoading: false,
    error: null,
    page: 1,
    hasMore: true,
    selectedDestination: null,
    searchedDestinations: [],

    getDestinations: async() => {
        const { page, hasMore, destinations, isLoading } = get();
        if(!hasMore || isLoading) return;
        set({isLoading: true});
        try {
            const res = await axiosInstance.get(`/destinations/allDestinations`, {params: {limit:12, page}});
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
    },

    getDestinationById: async (id) => {
        try {
            console.log("id: ", id)
            const res = await axiosInstance.get(`/destinations/destinationById/${id}`);
            set({selectedDestination: res.data});
        } catch (error) {
            console.error("Error fetching destination:", error);
            set({ selectedDestination: null, error: error.message });
            return null;
        }
    },

    searchDestination: async(query) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.get(`/destinations/search?q=${query}`);
            set({ searchedDestinations: res.data.destinations, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Search failed", isLoading: false });
        }
    },
    clearSearchResults: () => {
        set({ searchedDestinations: [] });
    }
}))