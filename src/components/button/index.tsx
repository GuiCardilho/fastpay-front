import { cn } from "@/utils/tailwind";
import { ReactNode } from "react";

interface InputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export const Button = ({ children, className, ...props }: InputProps) => {
	return (
		<button
			type="button"
			className={cn(
				"px-4 py-2 outline-none bg-blue-500 w-full rounded-md uppercase font-medium text-white transition-all hover:bg-blue-600 active:bg-blue-700",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
