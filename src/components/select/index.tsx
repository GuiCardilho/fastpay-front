import { cn } from "@/utils/tailwind";
import { ClassValue } from "clsx";
import { ReactNode, useState } from "react";
import { Controller } from "react-hook-form";

interface InputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	name: string;
	errorLabel?: string;
	classNameRoot?: ClassValue;
	label?: ReactNode;
	control: any;
	isPassword?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	mask?: string;
	register?: any;
	options?: {
		value: string;
		label: string;
	}[];
}

export const Select = ({
	errorLabel,
	className,
	classNameRoot,
	control,
	options,
	leftIcon,
	rightIcon,
	label,
	register,
	...props
}: InputProps) => {
	const [focus, setFocus] = useState(false);

	return (
		<div
			className={cn(
				"transition-all w-full flex flex-col gap-2 text-gray-700",
				classNameRoot,
			)}
		>
			{label && (
				<label
					htmlFor={props?.name}
					className={cn("text-md font-medium", {
						"!text-red-600": errorLabel,
						"text-gray-500": !focus,
						"text-blue-500": focus,
					})}
				>
					{label}
				</label>
			)}

			<div className="flex flex-col w-full h-full relative ">
				{leftIcon && (
					<div
						className={cn(
							"absolute left-2 top-1/2 transform -translate-y-1/2 ml-2 cursor-default",
							{
								"!text-red-600": errorLabel,
								"text-gray-500": !focus,
								"text-blue-500": focus,
							},
						)}
					>
						{leftIcon}
					</div>
				)}
				<Controller
					render={({ field }) => (
						<select
							{...field}
							{...register}
							id={props?.name}
							className={cn(
								"px-4 py-2 outline-none ring-2 rounded-md w-full focus:ring-blue-400  ring-gray-300 transition-all text-sm",
								className,
								{
									"ring-red-600 focus:ring-red-800": errorLabel,
								},
								{
									"pl-12": leftIcon,
									"pr-12  ": rightIcon,
								},
							)}
							onFocus={(e) => {
								setFocus(true);
								if (props.onFocus) props?.onFocus(e);
							}}
							onBlur={(e) => {
								setFocus(false);
								if (props.onBlur) props?.onBlur(e);
								field.onBlur();
							}}
							onChange={(e) => {
								if (props.mask) {
								}
								field.onChange(e);
								if (props.onChange) props?.onChange(e);
							}}
							{...props}
						>
							{options?.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					)}
					control={control}
					name={props.name || ""}
				/>

				{rightIcon && (
					<div
						className={cn(
							"absolute right-2 top-1/2 transform -translate-y-1/2 cursor-default mr-2",
							{
								"!text-red-600": errorLabel,
								"text-gray-500": !focus,
								"text-blue-500": focus,
							},
						)}
					>
						{rightIcon}
					</div>
				)}
			</div>

			{errorLabel && <span className="text-red-600 text-xs">{errorLabel}</span>}
		</div>
	);
};
