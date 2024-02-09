import { cn } from "@/lib/utils";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

interface FooterTableProps {
	count: number;
	total: number;
	totalPages: number;
	page: number;
	setPagination: (page: number) => void;
}

export const FooterTable = ({
	count,
	total,
	page,
	totalPages,
	setPagination,
}: FooterTableProps) => {
	return (
		<div className="flex items-center justify-between w-full gap-4">
			<span className="text-gray-600 dark:text-gray-400">
				Exibindo <span className="font-bold text-black">{count}</span> de{" "}
				<span className="font-bold text-black">{total}</span>
			</span>

			<div className="flex items-center gap-4">
				<button
					type="button"
					className={cn(
						"p-2 h-8 w-8 shadow text-sm rounded-md dark:hover:bg-gray-700 justify-center items-center flex text-white",
						{
							"!bg-blue-500 ": page !== 1,
							"disabled:bg-blue-300": page === 1,
						},
					)}
					disabled={page === 1}
					onClick={() => {
						if (page === 1) return;
						setPagination(page - 1);
					}}
				>
					<HiOutlineArrowLeft size={20} />
				</button>

				{page === total && page - 2 >= 0 && (
					<button
						type="button"
						className={cn(
							"p-2 h-8 w-8 shadow text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 justify-center items-center flex",
						)}
						onClick={() => {
							setPagination(page - 2);
						}}
					>
						{page - 2}
					</button>
				)}

				{page > 1 && (
					<button
						type="button"
						className={cn(
							"p-2 h-8 w-8 shadow text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 justify-center items-center flex",
						)}
						onClick={() => {
							setPagination(page - 1);
						}}
					>
						{page - 1}
					</button>
				)}

				<button
					type="button"
					className={cn(
						"p-2 h-8 w-8 shadow text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 justify-center items-center flex bg-gray-100 dark:bg-gray-700",
					)}
				>
					{page}
				</button>

				{page === 1 && page + 1 <= totalPages && (
					<button
						type="button"
						className={cn(
							"p-2 h-8 w-8 shadow text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 justify-center items-center flex",
						)}
						onClick={() => {
							setPagination(page + 1);
						}}
					>
						{page + 1}
					</button>
				)}

				{page !== 1 && page + 1 <= totalPages && (
					<button
						type="button"
						className={cn(
							"p-2 h-8 w-8 shadow text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 justify-center items-center flex",
						)}
						onClick={() => {
							setPagination(page + 1);
						}}
					>
						{page + 1}
					</button>
				)}

				{page === 1 && page + 2 <= totalPages && (
					<button
						type="button"
						className={cn(
							"p-2 h-8 w-8 shadow text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 justify-center items-center flex",
						)}
						onClick={() => {
							setPagination(page + 2);
						}}
					>
						{page + 2}
					</button>
				)}

				<button
					type="button"
					className={cn(
						"p-2 h-8 w-8 shadow text-sm rounded-md  dark:hover:bg-gray-700 justify-center items-center flex text-white",
						{
							"!bg-blue-500 ": page !== totalPages,
							"disabled:bg-blue-300": page === totalPages,
						},
					)}
					disabled={page === totalPages}
					onClick={() => {
						if (page === total) return;
						setPagination(page + 1);
					}}
				>
					<HiOutlineArrowRight size={20} />
				</button>
			</div>
		</div>
	);
};
