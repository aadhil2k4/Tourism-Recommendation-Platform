import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { toast } from "react-hot-toast";

export const useQuizStore = create((set) => ({
    isQuizTaken: false,
    error: null,
    isLoading: false,
    questions: [],

    getQuiz: async() => {
        set({isLoading: true})
        try {
            const res = await axiosInstance.get("/quiz/getQuiz");
            set({questions: res.data, isLoading: false});
        } catch (error) {
            console.log("Error fetching quiz: ", error);
            set({error: error, isLoading: false});
        }
    },

    submitQuiz: async(answers) => {
        set({isLoading: true});
        try {
            const res = await axiosInstance.post("/quiz/submitQuiz", {answers});
            console.log("Quiz submission response: ", res.data)
            set({isLoading: false, isQuizTaken: true});
            if (res.data && res.data.message) {
                toast.success(res.data.message);
            } else {
                toast.success("Quiz submitted successfully!");
            }
            return res.data
        } catch (error) {
            toast.error("Error while saving response!! Try again");
            console.log("Error while submitting quiz: ", error);
            set({error: error.response.data.message, isLoading:false});
        }
    }
}))