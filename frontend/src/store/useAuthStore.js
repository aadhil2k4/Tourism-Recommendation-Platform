import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isSigningUp: null,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isLoading: false,
  error: null,

  signup: async (data) => {
    set({ isLoading: true, error: null, isSigningUp:true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response.data.message || "Error signing up", isLoading: false });
      set({isLoading: false, isAuthenticated: false})
      toast.error(error.response.data.message);
    }
  },

  verifyEmail: async (code) =>{
    set({isLoading: true, error: null});
    try {
      const res = await axiosInstance.post("/auth/verifyEmail", { code });
      set({user: res.data.user, isAuthenticated: true, isLoading: false});
      return res.data;
    } catch (error) {
      set({ error: error.response.data.message || "Error verifying email", isLoading: false });
      throw error;
    }
  }

  /*checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
    } catch (error) {
    } finally {
    }
  },*/
}));
