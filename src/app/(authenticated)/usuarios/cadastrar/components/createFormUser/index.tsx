import { Input } from "@/components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";
import { useHookFormMask } from "use-mask-input";

import * as yup from "yup";

interface FormValues {
	id?: string;
	email?: string;
	phone?: string;
	name?: string;
}

interface IProps {
	isSubmit: boolean;
	submit: (values?: FormValues) => void;
	send: boolean;
}

export const CreateFormUser = (props: IProps) => {
	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Email deve ser um email válido")
			.required("Email é obrigatório"),

		phone: yup
			.string()
			.required("Telefone é obrigatório")
			.test("phone", "Telefone inválido", (value) => {
				if (value.includes("+"))
					return value?.replaceAll("_", "")?.length === 19;
				return value?.replaceAll("_", "")?.length === 14;
			}),
		name: yup.string().required("Nome é obrigatório"),
		password: yup
			.string()
			.required("Senha é obrigatória")
			.min(6, "Senha deve ter no mínimo 6 caracteres")
			.max(20, "Senha deve ter no máximo 20 caracteres")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
				"Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
			),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const registerWithMask = useHookFormMask(register);

	useEffect(() => {
		if (props.send) handleSubmit(props.submit)();
	}, [props.isSubmit]);

	return (
		<Fragment>
			<div className="flex gap-4 transition-all w-full flex-wrap">
				<div className="flex gap-4 transition-all w-full flex-wrap">
					<Input
						leftIcon={<HiOutlineUser size={20} />}
						name="name"
						label="Nome"
						placeholder="Digite seu nome"
						errorLabel={errors.name?.message}
						control={control}
						classNameRoot=" flex-1 min-w-[200px]"
					/>

					<Input
						leftIcon={<HiOutlinePhone size={20} />}
						name="phone"
						label="Telefone"
						placeholder="Digite seu telefone"
						errorLabel={errors.phone?.message}
						control={control}
						register={registerWithMask("phone", "+99 (99) 99999-9999")}
						classNameRoot=" flex-1 min-w-[250px]"
					/>
				</div>
				<div className="flex gap-4 transition-all w-full flex-wrap">
					<Input
						leftIcon={<HiOutlineMail size={20} />}
						name="email"
						label="Email"
						placeholder="Digite seu email"
						errorLabel={errors.email?.message}
						control={control}
						classNameRoot=" flex-1 min-w-[250px]"
					/>
					<Input
						leftIcon={<HiOutlineMail size={20} />}
						name="password"
						label="Senha"
						placeholder="Digite sua senha"
						errorLabel={errors.password?.message}
						control={control}
						classNameRoot=" flex-1 min-w-[250px]"
						isPassword
					/>
				</div>
			</div>
		</Fragment>
	);
};
