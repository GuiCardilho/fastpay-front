"use client";

import { Heading } from "@/components/heading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { TableUser } from "./components/table";

export default function Page() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const { data, isLoading } = useQuery({
		queryKey: ["users", { page, limit }],
		queryFn: async () => {
			return {
				data: [
					{
						id: "1",
						name: "John Doe",
						email: "teste@teste.com",
						phone: "123456789",
					},
				],
				total: 1,
				page: 1,
				limit: 10,
				totalPages: 1,
			};
		},
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-white rounded-md p-4">
				<Heading
					title="Usuarios"
					subtitle="Listagem de usuarios"
					icon={<HiOutlineUser size={42} className="text-gray-600" />}
				/>
			</div>

			<div className="bg-white rounded-md p-4">
				<TableUser
					data={data?.data || []}
					isLoading={isLoading}
					limit={limit}
					page={page}
					totalPages={data?.totalPages || 1}
					totalItems={data?.total || 0}
					setPagination={(page) => setPage(page)}
					setLimit={(limit) => {
						setLimit(limit);
						setPage(1);
					}}
				/>
			</div>
		</div>
	);
}
