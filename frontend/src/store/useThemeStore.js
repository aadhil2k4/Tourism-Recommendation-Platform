import { create } from "zustand"

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("appTheme") || "light",
    setTheme: (theme) => {
        localStorage.setItem("appTheme", theme);
        set({theme});
    }
}))