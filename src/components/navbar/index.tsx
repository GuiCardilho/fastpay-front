"use client";

import { sidebarStore } from "@/store/sidebar";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { PopoverNavbar } from "./popover";

export const Navbar = () => {
	const { toggleShow, show } = sidebarStore();

	const variants = {
		right: { rotate: 180 },
		left: { rotate: 0 },
	};

	return (
		<nav className="">
			<div className="flex items-center justify-between p-4 bg-white shadow-md">
				<div className="flex justify-center items-center">
					<motion.div
						initial={show ? "left" : "right"}
						animate={show ? "left" : "right"}
						variants={variants}
						transition={{ duration: 0.4 }}
						onClick={() => toggleShow()}
					>
						<HiOutlineArrowLeft className="text-2xl text-blue-700 cursor-pointer" />
					</motion.div>

					<div className="flex items-center space-x-4">
						<Image
							src="/logo_extended.png"
							alt="FastPay"
							width={150}
							height={100}
							priority
						/>
					</div>
				</div>
				<div className="flex items-center space-x-4 px-4">
					<PopoverNavbar />
				</div>
			</div>
		</nav>
	);
};
