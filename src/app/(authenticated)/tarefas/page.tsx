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
import { toast } from "react-toastify";
import { ITask, TableTask } from "./components/table";

export interface IResponse {
	tasks?: ITask[] | null;
	totalItems: number;
	totalPage: number;
	limit: number;
	page: number;
}

export default function Page() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("all");
	const [modal, setModal] = useState(false);
	const [refetchList, setRefetchList] = useState(false);
	const [idTask, setIdTask] = useState("");

	const { data, isLoading } = useQuery({
		queryKey: ["tasks", { page, limit, status, refetchList }],
		queryFn: async () => {
			const { data } = await api.get("/tasks", {
				params: {
					page,
					limit,
					filter: search || undefined,
					status,
				},
			});

			return data;
		},
	});

	const { mutate: deleteTask } = useMutation({
		mutationKey: ["deleteTask"],
		onMutate: async () => {
			await api.delete(`/tasks/${idTask}`);

			setRefetchList((prev) => !prev);

			const { message, ...option } = createToast({
				message: "Tarefa deletada com sucesso",
				options: {
					type: "success",
				},
			});
			//@ts-ignore
			toast(message, option);
			router.push("/tarefas");
		},
		onSuccess: () => {
			setRefetchList((prev) => !prev);

			const { message, ...option } = createToast({
				message: "Tarefa deletada com sucesso",
				options: {
					type: "success",
				},
			});
			//@ts-ignore
			toast(message, option);
		},
		onError: (error: any) => {
			setRefetchList((prev) => !prev);

			const { message, ...option } = createToast({
				message:
					typeof error.response.data.message === "string"
						? error.response.data.message
						: error.response.data.message[0] || "Erro ao deletar",
				options: {
					type: "error",
				},
			});
			//@ts-ignore
			toast(message, option);
		},
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-white rounded-md p-4">
				<Heading
					title="Minhas Tarefas"
					subtitle="Listagem de Tarefas"
					breadcrumb={[{ label: "Minhas Tarefas", link: "/tarefas" }]}
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
					data={data?.tasks || []}
					isLoading={isLoading}
					limit={limit}
					page={page}
					totalPages={data?.totalPage || 1}
					totalItems={data?.totalItems || 0}
					refetch={() => setRefetchList((prev) => !prev)}
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
