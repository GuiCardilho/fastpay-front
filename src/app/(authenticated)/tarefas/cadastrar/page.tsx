"use client";

import { Heading } from "@/components/heading";
import { api } from "@/services/api";
import { createToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineClipboardList, HiOutlinePencilAlt } from "react-icons/hi";
import { CreateFormTask } from "./components/createFormTask";

export default function Page() {
	const [isSubmit, setIsSubmit] = useState(false);
	const [send, setSend] = useState(false);

	const { mutate } = useMutation({
		mutationKey: ["createTask"],
		mutationFn: async (values) => {
			console.log(values);
			await api.post("/tasks", values);
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
				<CreateFormTask submit={handleEdit} isSubmit={isSubmit} send={send} />
			</div>
		</div>
	);
}
