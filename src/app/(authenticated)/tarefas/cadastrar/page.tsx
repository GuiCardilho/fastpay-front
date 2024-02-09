"use client";

import { Heading } from "@/components/heading";
import { createToast } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineClipboardList, HiOutlinePencilAlt } from "react-icons/hi";
import { CreateFormTask } from "./components/editForm";

export default function Page() {
	const [isSubmit, setIsSubmit] = useState(false);
	const [send, setSend] = useState(false);

	const { data, isLoading } = useQuery({
		queryKey: ["task"],
		queryFn: async () => {
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
		mutationKey: ["createTask"],
		mutationFn: async (values) => {
			console.log(values);
		},
		onSuccess: () => {
			createToast({
				options: {
					type: "success",
				},
				message: "Tarefa criado com sucesso",
			});
		},
		onError: (error: any) => {
			createToast({
				options: {
					type: "error",
				},
				message: error.message,
			});
		},
	});

	const handleEdit = (values: any) => {
		mutate(values);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-white rounded-md p-4">
				<Heading
					title="Usuarios"
					subtitle="Cadastrar tarefa"
					breadcrumb={[
						{ label: "Tarefas", link: "/tarefas" },
						{
							label: "Cadastrar tarefa",
							link: "#",
						},
					]}
					icon={<HiOutlineClipboardList size={42} className="text-gray-600" />}
					button={{
						children: (
							<div className="flex gap-2 justify-center items-center">
								<HiOutlinePencilAlt size={20} />
								Criar
							</div>
						),
						onClick: () => {
							setIsSubmit((prev) => !prev);
							setSend(true);
							return;
						},
					}}
				/>
			</div>

			<div className="bg-white rounded-md p-4">
				<CreateFormTask
					loading={isLoading}
					submit={handleEdit}
					isSubmit={isSubmit}
					data={data?.data || undefined}
					send={send}
				/>
			</div>
		</div>
	);
}
