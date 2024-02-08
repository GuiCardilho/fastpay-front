import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...value: ClassValue[]) => {
	return twMerge(clsx(value));
};
