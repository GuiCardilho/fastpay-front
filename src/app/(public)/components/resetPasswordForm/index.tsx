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
	HiOutlineUser,
} from "react-icons/hi";

import { toast } from "react-toastify";
import { useHookFormMask } from "use-mask-input";

import * as yup from "yup";
import { SelectSection } from "../../page";

interface FormValues {
	email: string;
	password: string;
	code: string;
}

interface IProps {
	toggleLogin: (param: SelectSection) => void;
}

export const ResetPasswordForm = ({ toggleLogin }: IProps) => {
	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Email deve ser um email válido")
			.required("Email é obrigatório"),
		code: yup.string().required("Código é obrigatório"),
		password: yup.string().required("Senha é obrigatória"),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,

		control,
		reset,
		watch,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const watchEmail = watch("email");

	const registerWithMask = useHookFormMask(register);

	const { mutate: sendEmail } = useMutation({
		mutationKey: ["sendEmailForResetPassword"],
		mutationFn: async (values: FormValues["email"]) => {
			const { data } = await api.post("/users/reset", {
				email: values,
			});
			console.log(data);
			return data;
		},
		onSuccess: (data) => {
			const { message, ...option } = createToast({
				message: "Código enviado com sucesso",
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
						: error.response.data.message[0] || "Erro ao enviar código",
				options: { type: "error" },
			});
			//@ts-ignore
			toast(message, option);
		},
	});

	const { mutate: createAccount } = useMutation({
		mutationKey: ["createAccount"],
		mutationFn: async (values: FormValues) => {
			const { data } = await api.post("/users/reset/update", {
				...values,
			});
			console.log(data);
			return data;
		},
		onSuccess: (data) => {
			reset();
			toggleLogin("login");

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
				<div className="w-full flex flex-row gap-2 items-end justify-end">
					<Input
						leftIcon={<HiOutlineMail size={20} />}
						name="email"
						label="Email"
						placeholder="Digite seu email"
						errorLabel={errors.email?.message}
						control={control}
					/>
					<Button
						className="w-full max-w-[200px] h-fit"
						onClick={() => {
							sendEmail(watchEmail);
						}}
					>
						<div className="w-full flex-nowrap flex flex-row gap-2">
							{" "}
							<HiOutlineMail size={20} />
							<p>Enviar email</p>
						</div>
					</Button>
				</div>

				<Input
					leftIcon={<HiOutlineUser size={20} />}
					name="code"
					label="Código"
					placeholder="Digite seu código"
					errorLabel={errors.code?.message}
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
						toggleLogin("login");
					}}
				>
					Já tem uma conta?
				</button>
			</div>

			<Button onClick={handleSubmit(onSubmit)}>Cadastrar</Button>
		</Fragment>
	);
};