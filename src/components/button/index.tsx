import { cn } from "@/utils/tailwind";
import { ReactNode } from "react";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary" | "danger";
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
	return (
		<button
			type="button"
			className={cn(
				"px-4 py-2 outline-none bg-blue-500 w-full rounded-md uppercase font-medium text-white transition-all hover:bg-blue-600 active:bg-blue-700",
				className,
				{
					"bg-white hover:bg-gray-200 active:bg-gray-400 border-2 border-gray-200 text-gray-700":
						props.variant === "secondary",
					"bg-red-500 hover:bg-red-600 active:bg-red-700":
						props.variant === "danger",
				},
			)}
			{...props}
		>
			{children}
		</button>
	);
};
