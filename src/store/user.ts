import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
	user: {
		token: string;
		name?: string;
	};
	setUser: (user: IUser["user"]) => void;
	logout: () => void;
}

const useStore = create<IUser>()(
	persist(
		(set) => ({
			user: {
				token: "",
				name: "",
			},
			setUser: (user: IUser["user"]) => set({ user }),
			logout: () => set({ user: { token: "", name: "" } }),
		}),
		{
			name: "user-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export { useStore as userStore };
