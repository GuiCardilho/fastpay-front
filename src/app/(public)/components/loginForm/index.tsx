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

interface FormValues {
	email: string;
	password: string;
}

interface IProps {
	toggleLogin: () => void;
}

export const LoginForm = ({ toggleLogin }: IProps) => {
	const { setUser } = userStore();
	const router = useRouter();

	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Email deve ser um email válido")
			.required("Email é obrigatório"),
		password: yup.string().required("Senha é obrigatória"),
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
		mutationFn: async (values: { email: string; password: string }) => {
			const { data } = await api.post("/users/auth", values);
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
			setError("email", {
				type: "manual",
				message: " ",
			});
			setError("password", {
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
			<div className="flex flex-col gap-4 transition-all w-full">
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
					Não tem uma conta?
				</button>
			</div>

			<Button onClick={handleSubmit(onSubmit)}>Entrar</Button>
		</Fragment>
	);
};
