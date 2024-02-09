import { Input } from "@/components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	HiOutlineCalendar,
	HiOutlineUser,
	HiOutlineViewList,
} from "react-icons/hi";

import * as yup from "yup";

interface FormValues {
	title?: string;
	description?: string;
	date?: string;
	id?: string;
}

interface IProps {
	isSubmit: boolean;
	submit: (values: FormValues) => void;
	loading: boolean;
	edit: boolean;
	data?: FormValues | undefined;
}

export const EditFormTask = (props: IProps) => {
	const schema = yup.object().shape({
		title: yup.string().required("Título é obrigatório"),
		description: yup.string().required("Descrição é obrigatória"),
		date: yup.string().required("Data é obrigatória"),
		id: yup.string().notRequired(),
	});

	const {
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (props.edit) {
			// @ts-ignore
			handleSubmit(props.submit)();
		}
	}, [props.isSubmit]);

	useEffect(() => {
		setValue("title", props.data?.title || "");
		setValue("description", props.data?.description || "");
		setValue("date", props.data?.date || "");
	}, [props.data]);

	return (
		<Fragment>
			<div className="flex gap-4 transition-all w-full flex-wrap">
				<div className="flex gap-4 transition-all w-full flex-wrap">
					<Input
						leftIcon={<HiOutlineViewList size={20} />}
						name="title"
						label="Titulo"
						placeholder="Digite o título da tarefa"
						errorLabel={errors.title?.message}
						control={control}
						classNameRoot=" flex-1 min-w-[200px]"
						disabled={!props.edit}
					/>

					<Input
						leftIcon={<HiOutlineCalendar size={20} />}
						name="date"
						label="Date"
						placeholder="Data da tarefa"
						errorLabel={errors.date?.message}
						control={control}
						classNameRoot=" flex-1 min-w-[200px]"
						type="date"
						disabled={!props.edit}
					/>
				</div>

				<Input
					name="description"
					label="Descrição"
					placeholder="Digite a descrição da tarefa"
					errorLabel={errors.description?.message}
					control={control}
					classNameRoot=" flex-1 min-w-[200px]"
					disabled={!props.edit}
					longText
				/>
			</div>
		</Fragment>
	);
};
