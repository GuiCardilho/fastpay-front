import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/services/api";
import { createToast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import {
	HiOutlineLockClosed,
	HiOutlineMail,
	HiOutlinePhone,
	HiOutlineUser,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { useHookFormMask } from "use-mask-input";

import * as yup from "yup";

interface FormValues {
	email: string;
	password: string;
	phone: string;
	name: string;
}

interface IProps {
	toggleLogin: () => void;
}

export const RegisterForm = ({ toggleLogin }: IProps) => {
	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Email deve ser um email válido")
			.required("Email é obrigatório"),
		password: yup
			.string()
			.required("Senha é obrigatória")
			.min(6, "Senha deve ter no mínimo 6 caracteres")
			.max(20, "Senha deve ter no máximo 20 caracteres")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
				"Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
			),

		phone: yup
			.string()
			.required("Telefone é obrigatório")
			.test("phone", "Telefone inválido", (value) => {
				return value?.replaceAll("_", "")?.length === 19;
			}),

		name: yup.string().required("Nome é obrigatório"),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,

		control,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			phone: "+55 15",
		},
	});

	const registerWithMask = useHookFormMask(register);

	const { mutate: createAccount } = useMutation({
		mutationKey: ["createAccount"],
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
			console.log(data);
			return data;
		},
		onSuccess: (data) => {
			reset();
			toggleLogin();

			const { message, ...option } = createToast({
				message: "Usuário cadastrado com sucesso",
				options: { type: "success" },
			});
			//@ts-ignore
			toast(message, option);
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

	const onSubmit = (values: FormValues) => {
		createAccount(values);
	};
	return (
		<Fragment>
			<div className="flex flex-col gap-4 transition-all w-full">
				<Input
					leftIcon={<HiOutlineUser size={20} />}
					name="name"
					label="Nome"
					placeholder="Digite seu nome"
					errorLabel={errors.name?.message}
					control={control}
				/>

				<Input
					leftIcon={<HiOutlinePhone size={20} />}
					name="phone"
					label="Telefone"
					placeholder="Digite seu telefone"
					errorLabel={errors.phone?.message}
					control={control}
					register={registerWithMask("phone", "+99 (99) 99999-9999")}
				/>

				<Input
					leftIcon={<HiOutlineMail size={20} />}
					name="email"
					label="Email"
					placeholder="Digite seu email"
					errorLabel={errors.email?.message}
					control={control}
				/>

				<Input
					leftIcon={<HiOutlineLockClosed size={20} />}
					name="password"
					label="Senha"
					placeholder="Digite sua senha"
					errorLabel={errors.password?.message}
					control={control}
					isPassword
				/>

				<button
					className="text-xs text-blue-600 font-medium text-start w-fit content-start cursor-pointer transition-all hover:text-blue-700 active:text-blue-900"
					type="button"
					onClick={() => {
						reset();
						toggleLogin();
					}}
				>
					Já tem uma conta?
				</button>
			</div>

			<Button onClick={handleSubmit(onSubmit)}>Cadastrar</Button>
		</Fragment>
	);
};
