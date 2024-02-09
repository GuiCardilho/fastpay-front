"use client";

import { userStore } from "@/store/user";
import * as Popover from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";

import {
	HiOutlineArrowCircleRight,
	HiOutlineEye,
	HiOutlineXCircle,
} from "react-icons/hi";
import { IUser } from ".";

export const PopoverTable = ({ ...user }: IUser) => {
	const { logout } = userStore();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	return (
		<Popover.Root>
			<Popover.Trigger className="flex">
				<HiOutlineEye className="w-10 h-10 shadow !font-normal text-gray-500 cursor-pointer hover:text-blue-600 transition-all duration-300 ease-in-out border border-solid border-gray-100 rounded-md p-2" />
			</Popover.Trigger>

			<Popover.Portal>
				<Popover.Content sideOffset={5} side="bottom" align="end">
					<div className="flex flex-col space-y-2 bg-white p-2 rounded-md shadow border border-solid border-gray-100 text-gray-500">
						<button
							type="button"
							className="flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer gap-2 rounded-md"
							onClick={() => router.push(`/usuarios/${user.id}`)}
						>
							<HiOutlineArrowCircleRight size={20} />
							Visualizar
						</button>
						<button
							type="button"
							className="flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer gap-2 rounded-md"
							onClick={handleLogout}
						>
							<HiOutlineXCircle size={20} />
							Inativar
						</button>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};
