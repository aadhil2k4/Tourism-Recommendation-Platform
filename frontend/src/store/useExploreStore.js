import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useExploreStore = create((set) => ({
  pins: [],
  fetchPins: async () => {
    try {
      const res = await axiosInstance.get("/pins");
      set({ pins: res.data });
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  },
  addPin: (newPin) =>
    set((state) => ({
      pins: [...state.pins, newPin],
    })),
}));
