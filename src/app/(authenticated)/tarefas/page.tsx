"use client";

import { DialogModal } from "@/components/dialog";
import { Heading } from "@/components/heading";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	HiOutlineClipboardList,
	HiOutlinePlus,
	HiOutlineXCircle,
} from "react-icons/hi";
import { TableTask } from "./components/table";

export default function Page() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [modal, setModal] = useState(false);

	const { data, isLoading } = useQuery({
		queryKey: ["tasks", { page, limit }],
		queryFn: async () => {
			return {
				data: [
					{
						id: "1",
						title: "Tarefa 1",
						description: "Descrição 1",
						date: "2021-09-01",
						status: "pendente",
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
					title="Tarefas"
					subtitle="Listagem de Tarefas"
					breadcrumb={[{ label: "Tarefas", link: "/tarefas" }]}
					icon={<HiOutlineClipboardList size={42} className="text-gray-600" />}
					button={{
						children: (
							<div className="flex gap-2 justify-center items-center">
								<HiOutlinePlus size={20} />
								Cadastrar
							</div>
						),
						onClick: () => {
							router.push("/tarefas/cadastrar");
						},
					}}
				/>
			</div>

			<div className="bg-white rounded-md p-4">
				<TableTask
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
					setModal={setModal}
				/>
			</div>

			<DialogModal
				isOpen={modal}
				setIsOpen={setModal}
				title="Deletar tarefa"
				description="Deseja realmente deletar essa tarefa? Essa ação não poderá ser desfeita."
				icon={<HiOutlineXCircle size={42} className="text-red-500 " />}
				variant="danger"
				button={[
					{
						children: "Cancelar",
						onClick: () => setModal(false),
						variant: "secondary",
					},
					{
						children: "Deletar",
						onClick: () => {
							setModal(false);
						},
						variant: "danger",
					},
				]}
			/>
		</div>
	);
}
