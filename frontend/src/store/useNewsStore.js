import { create } from "zustand";
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const useNewsStore = create((set) => ({
    articles: [],
    error: null,
    isLoading: true,

    getNews: async() => {
        set({isLoading: true, error: null});
        try {
            //console.log("NewsData API: ", API_KEY);
            const res = await axios.get(`https://newsdata.io/api/1/news?apikey=${API_KEY}&category=tourism,food,lifestyle&language=en`);
            console.log(res.data.results);
            if(res.data && res.data.results){
                set({ articles: res.data.results, isLoading: false });
            } else {
                set({ error: "No articles found", isLoading: false });
            }
        } catch (error) {
            set({ error: error || "Failed to fetch news", isLoading: false });
        }
    }
}))