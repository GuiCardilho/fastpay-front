"ue client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/services/api";
import { userStore } from "@/store/user";
import { createToast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import * as yup from "yup";
import { SelectSection } from "../../page";

interface FormValues {
	emailLogin: string;
	passwordLogin: string;
}

interface IProps {
	toggleLogin: (param: SelectSection) => void;
}

export const LoginForm = ({ toggleLogin }: IProps) => {
	const { setUser } = userStore();
	const router = useRouter();

	const schema = yup.object().shape({
		emailLogin: yup
			.string()
			.email("Email deve ser um email válido")
			.required("Email é obrigatório"),
		passwordLogin: yup.string().required("Senha é obrigatória"),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
		control,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { mutate: login } = useMutation({
		mutationKey: ["login"],
		mutationFn: async (values: {
			emailLogin: string;
			passwordLogin: string;
		}) => {
			const { data } = await api.post("/users/auth", {
				email: values.emailLogin,
				password: values.passwordLogin,
			});
			Cookies.set("user-auth", data.data);
			return data;
		},
		onSuccess: (data) => {
			setUser({
				token: data.data,
			});
			router.push("/usuarios");
		},
		onError: (error) => {
			setError("emailLogin", {
				type: "manual",
				message: " ",
			});
			setError("passwordLogin", {
				type: "manual",
				message: "Email ou senha inválidos",
			});

			const { message, ...option } = createToast({
				message: "Email ou senha inválidos",
				options: { type: "error" },
			});
			//@ts-ignore
			toast(message, option);
		},
	});

	const onSubmit = (values: FormValues) => {
		login(values);
	};
	return (
		<Fragment>
			<div className="flex flex-col gap-4 transition-all w-full text-start">
				<Input
					leftIcon={<HiOutlineMail size={20} />}
					name="emailLogin"
					label="Email"
					placeholder="Digite seu email"
					errorLabel={errors.emailLogin?.message}
					control={control}
				/>

				<Input
					leftIcon={<HiOutlineLockClosed size={20} />}
					name="passwordLogin"
					label="Senha"
					placeholder="Digite sua senha"
					errorLabel={errors.passwordLogin?.message}
					control={control}
					isPassword
				/>

				<div className="w-full flex items-start sm:items-center justify-start sm:justify-between flex-col sm:flex-row xs:gap-2">
					<button
						className="text-xs text-blue-600 font-medium text-start w-fit content-start cursor-pointer transition-all hover:text-blue-700 active:text-blue-900"
						type="button"
						onClick={() => {
							reset();
							toggleLogin("register");
						}}
					>
						Não tem uma conta?
					</button>
					<button
						className="text-xs text-gray-600 font-medium text-start w-fit content-start cursor-pointer transition-all hover:text-blue-700 active:text-blue-900"
						type="button"
						onClick={() => {
							reset();
							toggleLogin("resetPassword");
						}}
					>
						Recuperar senha
					</button>
				</div>
			</div>

			<Button onClick={handleSubmit(onSubmit)}>Entrar</Button>
		</Fragment>
	);
};
