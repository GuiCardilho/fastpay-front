import { create } from "zustand";

interface IUser {
	user: {
		token: string;
		name: string;
	};
	setUser: (user: IUser["user"]) => void;
	logout: () => void;
}

const useStore = create<IUser>((set) => ({
	user: {
		token: "",
		name: "",
	},
	setUser: (user: IUser["user"]) => set({ user }),
	logout: () => set({ user: { token: "", name: "" } }),
}));

export { useStore as userStore };
