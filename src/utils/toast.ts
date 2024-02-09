import { Bounce, ToastOptions } from "react-toastify";

interface ToastProps {
	message: string;
	options?: ToastOptions;
}

export const createToast = ({ message, options }: ToastProps) => {
	return {
		message,
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Bounce,
		...options,
	};
};
