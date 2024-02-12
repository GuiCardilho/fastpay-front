import { Input } from "@/components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCalendar, HiOutlineViewList } from "react-icons/hi";

import * as yup from "yup";

interface FormValues {
	title: string;
	description: string;
	date: string;
	id: string;
}

interface IProps {
	isSubmit: boolean;
	submit: (values?: FormValues) => void;
	send: boolean;
}

export const CreateFormTask = (props: IProps) => {
	const schema = yup.object().shape({
		title: yup.string().required("Título é obrigatório"),
		description: yup.string().required("Descrição é obrigatória"),
		date: yup.string().required("Data é obrigatória"),
		id: yup.string().notRequired(),
	});

	const {
		formState: { errors },
		handleSubmit,
		control,
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		// @ts-ignore
		if (props.send) handleSubmit(props.submit)();
	}, [props.isSubmit]);

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
					/>

					<Input
						leftIcon={<HiOutlineCalendar size={20} />}
						name="date"
						label="Data"
						placeholder="Data da tarefa"
						errorLabel={errors.date?.message}
						control={control}
						classNameRoot=" flex-1 min-w-[200px]"
						type="date"
					/>
				</div>

				<Input
					name="description"
					label="Descrição"
					placeholder="Digite a descrição da tarefa"
					errorLabel={errors.description?.message}
					control={control}
					classNameRoot=" flex-1 min-w-[200px]"
					className="resize-none h-[300px]"
					longText
				/>
			</div>
		</Fragment>
	);
};
