import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ITheme {
	theme: "light" | "dark";
	toggleTheme: () => void;
	setTheme: (theme: ITheme["theme"]) => void;
}

const useStore = create<ITheme>()(
	persist(
		(set) => ({
			theme: "light",
			toggleTheme: () =>
				set((state) => ({
					theme: state.theme === "light" ? "dark" : "light",
				})),
			setTheme: (theme: ITheme["theme"]) => set({ theme }),
		}),
		{
			name: "theme-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export { useStore as themeStore };
