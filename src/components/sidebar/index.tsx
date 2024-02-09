"use client";

import { sidebarStore } from "@/store/sidebar";
import { cn } from "@/utils/tailwind";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineClipboardList, HiOutlineUser } from "react-icons/hi";

export const Sidebar = () => {
	const { show, setShow } = sidebarStore();
	const [isAbsolute, setIsAbsolute] = useState(false);

	useEffect(() => {
		if (show)
			setTimeout(() => {
				setIsAbsolute(false);
			}, 500);
		else
			setTimeout(() => {
				setIsAbsolute(true);
			}, 500);
	}, [show]);

	const list = [
		{
			name: "Usuários",
			icon: <HiOutlineUser size={20} />,
			href: "/usuarios",
		},
		{
			name: "Tarefas",
			icon: <HiOutlineClipboardList size={20} />,
			href: "/tarefas",
		},
	];

	const variants = {
		left: { x: 0, width: "250px" },
		right: { x: "-200%" },
		absolute: { x: "-200%" },
	};

	console.log("show", show);

	return (
		<div
			className={cn("flex ", {
				"absolute md:relative z-30": isAbsolute,
				"z-10": !show,
			})}
		>
			<motion.aside
				initial={show ? "left" : "right"}
				animate={show ? "left" : "right"}
				variants={variants}
				transition={{ duration: 0.5 }}
				className={cn(
					"h-[100svh] overflow-hidden absolute flex-col bg-white px-6 py-6 text-md text-gray-500 w-[250px] transition-all duration-300 ease-in-out border-r border-solid shadow md:flex",
					{
						absolute: isAbsolute,
						"absolute md:relative z-30": !isAbsolute,
						"z-0": !show,
					},
				)}
			>
				<div className="flex flex-col gap-4">
					{list.map((item) => (
						<Link
							href={item.href}
							key={item.name}
							className="flex flex-col gap-2  bg-white w-full py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 active:bg-gray-200 justify-center items-start text-center px-4"
						>
							<div className="flex items-center gap-2">
								<span className="material-icons">{item.icon}</span>
								<span>{item.name}</span>
							</div>
						</Link>
					))}
				</div>
			</motion.aside>
			<button
				type="button"
				className={cn(
					"flex-1 absolute bg-gray-700 opacity-50 w-[100svw] h-[100svh] z-20 md:hidden",
					show ? "block" : "hidden z-0",
				)}
				onClick={() => {
					setShow(false);
				}}
			/>
		</div>
	);
};
