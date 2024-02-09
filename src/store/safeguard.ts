import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
	verifyToken: (token: string) => void;
}

const useStore = create<IUser>()(
	persist(
		(set) => ({
			verifyToken: (token: string) => {
				const verifiedToken = token && token.length > 0;
			},
		}),
		{
			name: "user-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export { useStore as safeGuardStore };
