"use client";

import { userStore } from "@/store/user";
import * as Popover from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";

import {
	HiOutlineCog,
	HiOutlineLogin,
	HiOutlineUserCircle,
} from "react-icons/hi";

import { motion } from "framer-motion";
import { useState } from "react";

export const PopoverNavbar = () => {
	const { logout } = userStore();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	const [show, setShow] = useState(false);
	const variants = {
		left: { rotate: 270 },
		right: { rotate: 0 },
	};

	return (
		<Popover.Root>
			<Popover.Trigger>
				<motion.div
					animate={show ? "left" : "right"}
					variants={variants}
					transition={{ duration: 0.7 }}
					onClick={() => setShow((prev) => !prev)}
				>
					<HiOutlineCog
						size={20}
						className="cursor-pointer hover:text-blue-600 transition-all duration-300 ease-in-out"
					/>
				</motion.div>
			</Popover.Trigger>

			<Popover.Portal>
				<Popover.Content sideOffset={5} side="bottom" align="end">
					<div className="flex flex-col space-y-2 bg-white px-6 py-2 rounded-md shadow border border-solid border-gray-100">
						<div className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer gap-4 rounded-md">
							<HiOutlineUserCircle size={20} />
							Perfil
						</div>
						<button
							type="button"
							className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer gap-4 rounded-md"
							onClick={handleLogout}
						>
							<HiOutlineLogin size={20} />
							Sair
						</button>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};
