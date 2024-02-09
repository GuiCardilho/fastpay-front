"use client";

import { Heading } from "@/components/heading";
import { createToast } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	HiOutlineCheck,
	HiOutlinePencilAlt,
	HiOutlineUser,
} from "react-icons/hi";
import { EditFormUser } from "./components/editForm";

export default function Page() {
	const [edit, setEdit] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);

	const { data, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			return {
				data: {
					id: "1",
					name: "John Doe",
					email: "teste@teste.com",
					phone: "05515998518071",
				},

				total: 1,
				page: 1,
				limit: 10,
				totalPages: 1,
			};
		},
	});

	const { mutate } = useMutation({
		mutationKey: ["editUser"],
		mutationFn: async (values) => {
			setEdit(false);
			console.log(values);
		},
		onSuccess: () => {
			createToast({
				options: {
					type: "success",
				},
				message: "Usuario editado com sucesso",
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
					data={data?.data || {}}
				/>
			</div>
		</div>
	);
}
