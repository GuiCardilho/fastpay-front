import { create } from "zustand";

interface ITheme {
	theme: "light" | "dark";
	toggleTheme: () => void;
	setTheme: (theme: ITheme["theme"]) => void;
}

const useStore = create<ITheme>((set) => ({
	theme: "light",
	toggleTheme: () =>
		set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
	setTheme: (theme: ITheme["theme"]) => set({ theme }),
}));

export { useStore as themeStore };
