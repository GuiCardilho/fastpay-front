"use client";

import { Heading } from "@/components/heading";
import { api } from "@/services/api";
import { createToast } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	HiOutlineCheck,
	HiOutlinePencilAlt,
	HiOutlineUser,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { EditFormUser } from "./components/editForm";

export default function Page({ params }: { params: { id: string } }) {
	const [edit, setEdit] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);

	const { data, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const { data } = await api.get(`/users/${params.id}`);

			return data;
		},
	});

	const { mutate } = useMutation({
		mutationKey: ["editUser"],
		mutationFn: async (values: any) => {
			setEdit(false);
			console.log(values);

			const payload = {
				...values,
				phone: values.phone
					.replaceAll("_", "")
					.replaceAll(" ", "")
					.replaceAll("(", "")
					.replaceAll(")", "")
					.replaceAll("-", "")
					.replaceAll("+", ""),
			};
			await api.put(`/users/${params.id}`, { ...payload });
		},
		onSuccess: () => {
			const { message, ...option } = createToast({
				options: {
					type: "success",
				},
				message: "Usuario editado com sucesso",
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
						: error.response.data.message[0] || "Erro ao editar usuario",
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
					subtitle="Edição de usuario"
					breadcrumb={[
						{ label: "Usuarios", link: "/usuarios" },
						{
							label: data?.data.name || "Carregando...",
							link: "#",
						},
					]}
					icon={<HiOutlineUser size={42} className="text-gray-600" />}
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
				<EditFormUser
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
