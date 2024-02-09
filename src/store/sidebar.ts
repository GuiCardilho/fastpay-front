import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ISideBar {
	show: boolean;
	hide: () => void;
	toggleShow: () => void;
	setShow: (show: boolean) => void;
}

const useStore = create<ISideBar>()(
	persist(
		(set) => ({
			show: false,
			hide: () => set({ show: false }),
			toggleShow: () => set((state) => ({ show: !state.show })),
			setShow: (show) => set({ show }),
		}),
		{
			name: "sidebar-store",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export { useStore as sidebarStore };
