import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isSigningUp: null,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isLoading: false,
  error: null,
  message: null,

  signup: async (data) => {
    set({ isLoading: true, error: null, isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return { status: "success", data: res.data };
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
      //return { status: "error", message: error.response.data.message };
      //toast.error(error.response.data.message);
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/verifyEmail", { code });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        isSigningUp: false,
      });
      return res.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axiosInstance.get("/auth/checkAuth");
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.log(error.response.data.message);
      set({
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axiosInstance.post("/auth/forgotPassword", {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error in sending Password reset link",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axiosInstance.post(
        `/auth/resetPassword/${token}`,
        { password }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
