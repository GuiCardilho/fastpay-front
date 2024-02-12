"use client";

import { Heading } from "@/components/heading";
import { api } from "@/services/api";
import { createToast } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	HiOutlineCheck,
	HiOutlineClipboardList,
	HiOutlinePencilAlt,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { EditFormTask } from "./components/editForm";

export default function Page({ params }: { params: { id: string } }) {
	const [edit, setEdit] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);

	const { data, isLoading } = useQuery({
		queryKey: ["task"],
		queryFn: async () => {
			const { data } = await api.get(`/tasks/${params.id}`);

			return {
				data: {
					id: "1",
					title: "Tarefa 1",
					description: "Descrição 1",
					date: "2021-09-01",
					status: "pendente",
				},

				total: 1,
				page: 1,
				limit: 10,
				totalPages: 1,
			};
		},
	});

	const { mutate } = useMutation({
		mutationKey: ["editTask"],
		mutationFn: async (values) => {
			setEdit(false);
			console.log(values);
			await api.put(`/tasks/${params.id}`, values);
		},
		onSuccess: () => {
			const { message, ...option } = createToast({
				options: {
					type: "success",
				},
				message: "Tarefas editado com sucesso",
			});
			//@ts-ignore
			toast(message, option);
		},
		onError: (error: any) => {
			const { message, ...option } = createToast({
				options: {
					type: "error",
				},
				message:
					typeof error.response.data.message === "string"
						? error.response.data.message
						: error.response.data.message[0] || "Erro ao cadastrar",
			});
			//@ts-ignore
			toast(message, option);
		},
	});

	const handleEdit = (values: any) => {
		mutate(values);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-white rounded-md p-4">
				<Heading
					title="Minhas Tarefas"
					subtitle="Edição de tarefas"
					breadcrumb={[
						{ label: "Minhas Tarefas", link: "/tarefas" },
						{
							label: data?.data.title || "Carregando...",
							link: "#",
						},
					]}
					icon={<HiOutlineClipboardList size={42} className="text-gray-600" />}
					button={{
						children: (
							<>
								{!edit ? (
									<div className="flex gap-2 justify-center items-center">
										<HiOutlinePencilAlt size={20} />
										Editar
									</div>
								) : (
									<div className="flex gap-2 justify-center items-center">
										<HiOutlineCheck size={20} />
										Salvar
									</div>
								)}
							</>
						),
						onClick: () => {
							if (edit) {
								setIsSubmit((prev) => !prev);
								return;
							}

							setEdit(true);
						},
					}}
				/>
			</div>

			<div className="bg-white rounded-md p-4">
				<EditFormTask
					edit={edit}
					loading={isLoading}
					submit={handleEdit}
					isSubmit={isSubmit}
					data={data?.data || undefined}
				/>
			</div>
		</div>
	);
}
