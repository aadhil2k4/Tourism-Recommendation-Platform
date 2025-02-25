import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js"

export const AuthUser = create((set, get) => ({
    authUser: null,
    isSigningUp: null,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check")
        } catch (error) {
            
        } finally {

        }
    }
}))