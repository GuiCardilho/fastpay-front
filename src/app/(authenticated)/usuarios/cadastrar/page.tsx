"use client";

import { Heading } from "@/components/heading";
import { api } from "@/services/api";
import { createToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlinePencilAlt, HiOutlineUser } from "react-icons/hi";
import { toast } from "react-toastify";
import { CreateFormUser } from "./components/createFormUser";

interface FormValues {
	email: string;
	password: string;
	phone: string;
	name: string;
}

export default function Page() {
	const [isSubmit, setIsSubmit] = useState(false);
	const [send, setSend] = useState(false);
	const router = useRouter();

	const { mutate: createAcount } = useMutation({
		mutationKey: ["createAcount"],
		mutationFn: async (values: FormValues) => {
			const { data } = await api.post("/users", {
				...values,
				phone: values.phone
					.replaceAll("_", "")
					.replaceAll(" ", "")
					.replaceAll("(", "")
					.replaceAll(")", "")
					.replaceAll("-", "")
					.replaceAll("+", ""),
			});

			return data;
		},
		onSuccess: (data) => {
			const { message, ...option } = createToast({
				message: "Usuário cadastrado com sucesso",
				options: { type: "success" },
			});
			//@ts-ignore
			toast(message, option);
			router.push("/usuarios");
		},
		onError: (error: any) => {
			const { message, ...option } = createToast({
				message:
					typeof error.response.data.message === "string"
						? error.response.data.message
						: error.response.data.message[0] || "Erro ao cadastrar",
				options: { type: "error" },
			});
			//@ts-ignore
			toast(message, option);
		},
	});

	const handleRegister = (values: any) => {
		createAcount(values);
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
					submit={handleRegister}
					isSubmit={isSubmit}
					send={send}
				/>
			</div>
		</div>
	);
}
