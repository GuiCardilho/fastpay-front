"use client";

import { Button, ButtonProps } from "@/components/button";
import { cn } from "@/utils/tailwind";
import { Dialog } from "@headlessui/react";

interface IDialogModal {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	title?: string;
	description?: string;
	children?: React.ReactNode;
	button?: ButtonProps[];
	icon?: React.ReactNode;
	variant?: "primary" | "danger";
}

export const DialogModal = ({
	isOpen,
	setIsOpen,
	title,
	description,
	children,
	button,
	icon,
	variant,
}: IDialogModal) => {
	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="relative z-50"
		>
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				<Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-8 justify-center items-start gap-8 flex flex-col">
					{icon && (
						<div className="flex justify-center items-center w-full ">
							<div
								className={cn(
									"flex p-4 bg-blue-200 rounded-full ring-2 ring-blue-500 transition-all duration-300 ease-in-out items-center justify-center w-16 h-16",
									{
										"bg-red-50 ring-red-500": variant === "danger",
									},
								)}
							>
								{icon}
							</div>
						</div>
					)}

					<div className="gap-4 flex flex-col ">
						<Dialog.Title
							className={cn(
								"text-gray-600 text-2xl font-bold justify-center text-center",
								{
									"text-red-500": variant === "danger",
								},
							)}
						>
							{title}
						</Dialog.Title>
						<Dialog.Description>{description}</Dialog.Description>

						{children}

						{button?.length && (
							<div className="w-full flex gap-2">
								{button?.map((item, index) => (
									<Button key={item?.name || index} {...item}>
										{item.children}
									</Button>
								))}
							</div>
						)}
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};
