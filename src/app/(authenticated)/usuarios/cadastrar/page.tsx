"use client";

import { Heading } from "@/components/heading";
import { api } from "@/services/api";
import { createToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlinePencilAlt, HiOutlineUser } from "react-icons/hi";
import { CreateFormUser } from "./components/createFormUser";

export default function Page() {
	const [isSubmit, setIsSubmit] = useState(false);
	const [send, setSend] = useState(false);

	const { mutate } = useMutation({
		mutationKey: ["createUser"],
		mutationFn: async (values) => {
			console.log(values);
			await api.post("/users", values);
		},
		onSuccess: () => {
			createToast({
				options: {
					type: "success",
				},
				message: "Usuario criado com sucesso",
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
					subtitle="Cadastrar usuario"
					breadcrumb={[
						{ label: "Usuarios", link: "/usuarios" },
						{
							label: "Cadastrar usuario",
							link: "#",
						},
					]}
					icon={<HiOutlineUser size={42} className="text-gray-600" />}
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
				<CreateFormUser submit={handleEdit} isSubmit={isSubmit} send={send} />
			</div>
		</div>
	);
}
