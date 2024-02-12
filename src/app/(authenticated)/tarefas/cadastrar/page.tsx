"use client";

import { Heading } from "@/components/heading";
import { api } from "@/services/api";
import { createToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineClipboardList, HiOutlinePencilAlt } from "react-icons/hi";
import { toast } from "react-toastify";
import { CreateFormTask } from "./components/createFormTask";

export default function Page() {
	const [isSubmit, setIsSubmit] = useState(false);
	const [send, setSend] = useState(false);
	const router = useRouter();

	const { mutate } = useMutation({
		mutationKey: ["createTask"],
		mutationFn: async (values) => {
			console.log(values);
			await api.post("/tasks", values);
		},
		onSuccess: () => {
			const { message, ...option } = createToast({
				options: {
					type: "success",
				},
				message: "Tarefa criado com sucesso",
			});
			//@ts-ignore
			toast(message, option);
			router.push("/tarefas");
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
					title="Usuarios"
					subtitle="Cadastrar tarefa"
					breadcrumb={[
						{ label: "Minhas Tarefas", link: "/tarefas" },
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
