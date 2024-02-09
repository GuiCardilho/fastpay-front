import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/services/api";
import { userStore } from "@/store/user";
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
import { useHookFormMask } from "use-mask-input";

import * as yup from "yup";

interface FormValues {
	email: string;
	password: string;
}

interface IProps {
	toggleLogin: () => void;
}

export const RegisterForm = ({ toggleLogin }: IProps) => {
	const { setUser } = userStore();

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
				return value?.replaceAll("_", "")?.length === 20;
			}),

		name: yup.string().required("Nome é obrigatório"),
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
		defaultValues: {
			phone: "+055 15",
		},
	});

	const registerWithMask = useHookFormMask(register);

	const { mutate: createAconte } = useMutation({
		mutationKey: ["createAconte"],
		mutationFn: async (values: { email: string; password: string }) => {
			console.log(values);
			const { data } = await api.post("/register", values);

			return data;
		},
		onSuccess: (data) => {
			console.log(data);
			setUser({
				name: data.name,
				token: data.token,
			});
		},
		onError: (error) => {
			createToast({
				message: error.message,
				options: { type: "error" },
			});
		},
	});

	const onSubmit = (values: FormValues) => {
		createAconte(values);
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
					register={registerWithMask("phone", "+999 (99) 99999-9999")}
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
