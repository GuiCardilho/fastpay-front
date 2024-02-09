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
	submit: (values: FormValues) => void;
	loading: boolean;
	edit: boolean;
	data?: FormValues | undefined;
}

export const EditFormUser = (props: IProps) => {
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
					return value?.replaceAll("_", "")?.length === 20;
				return value?.replaceAll("_", "")?.length === 14;
			}),
		name: yup.string().required("Nome é obrigatório"),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const registerWithMask = useHookFormMask(register);

	useEffect(() => {
		if (props.edit) {
			handleSubmit(props.submit)();
		}
	}, [props.isSubmit]);

	useEffect(() => {
		setValue("email", props.data?.email || "");
		setValue("phone", props.data?.phone || "");
		setValue("name", props.data?.name || "");
	}, [props.data]);

	return (
		<Fragment>
			<div className="flex gap-4 transition-all w-full flex-wrap">
				<Input
					leftIcon={<HiOutlineUser size={20} />}
					name="name"
					label="Nome"
					placeholder="Digite seu nome"
					errorLabel={errors.name?.message}
					control={control}
					classNameRoot=" flex-1 min-w-[200px]"
					disabled={!props.edit}
				/>

				<div className="flex gap-4 transition-all w-full flex-wrap">
					<Input
						leftIcon={<HiOutlinePhone size={20} />}
						name="phone"
						label="Telefone"
						placeholder="Digite seu telefone"
						errorLabel={errors.phone?.message}
						control={control}
						register={registerWithMask("phone", "+999 (99) 99999-9999")}
						classNameRoot=" flex-1 min-w-[250px]"
						disabled={!props.edit}
					/>

					<Input
						leftIcon={<HiOutlineMail size={20} />}
						name="email"
						label="Email"
						placeholder="Digite seu email"
						errorLabel={errors.email?.message}
						control={control}
						classNameRoot=" flex-1 min-w-[250px]"
						disabled={!props.edit}
					/>
				</div>
			</div>
		</Fragment>
	);
};
