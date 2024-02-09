"use client";

import { Heading } from "@/components/heading";
import { createToast } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlinePencilAlt, HiOutlineUser } from "react-icons/hi";
import { CreateFormUser } from "./components/editForm";

export default function Page() {
	const [isSubmit, setIsSubmit] = useState(false);
	const [send, setSend] = useState(false);

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
		mutationKey: ["createUser"],
		mutationFn: async (values) => {
			console.log(values);
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
				<CreateFormUser
					loading={isLoading}
					submit={handleEdit}
					isSubmit={isSubmit}
					data={data?.data || {}}
					send={send}
				/>
			</div>
		</div>
	);
}
