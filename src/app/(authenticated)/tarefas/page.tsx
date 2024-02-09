"use client";

import { DialogModal } from "@/components/dialog";
import { Heading } from "@/components/heading";
import { api } from "@/services/api";
import { createToast } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
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
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("all");
	const [modal, setModal] = useState(false);
	const [refetch, setRefetch] = useState(false);
	const [idTask, setIdTask] = useState("");

	const { data, isLoading } = useQuery({
		queryKey: ["tasks", { page, limit, status, refetch }],
		queryFn: async () => {
			// const { data } = await api.get("/tasks", {
			//     params: {
			//         page,
			//         limit,
			//         search,
			//         status,
			//     },
			// });

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

	const { mutate: deleteTask } = useMutation({
		mutationKey: ["deleteTask"],
		onMutate: async (id) => {
			await api.delete(`/tasks/${id}`);
		},
		onSuccess: () => {
			setRefetch(!refetch);
			createToast({
				message: "Tarefa deletada com sucesso",
				options: {
					type: "success",
				},
			});
		},
		onError: (error) => {
			setRefetch(!refetch);
			createToast({
				message: error.message,
				options: {
					type: "error",
				},
			});
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
					refetch={() => setRefetch(!refetch)}
					setPagination={(page) => setPage(page)}
					setModal={setModal}
					setIdTask={setIdTask}
					setSearch={(search) => setSearch(search)}
					setStatus={(status) => setStatus(status)}
					setLimit={(limit) => {
						setLimit(limit);
						setPage(1);
					}}
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
							deleteTask();
							setModal(false);
						},
						variant: "danger",
					},
				]}
			/>
		</div>
	);
}
