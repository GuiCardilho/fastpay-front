import { themeStore } from "@/store/theme";
import { Bounce, ToastOptions, toast } from "react-toastify";

interface ToastProps {
	message: string;
	options?: ToastOptions;
}

export const createToast = ({ message, options }: ToastProps) => {
	const { theme } = themeStore();

	toast(message, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: theme,
		transition: Bounce,
		...options,
	});
};
