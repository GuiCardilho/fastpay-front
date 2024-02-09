import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { HiOutlineUser, HiOutlineXCircle } from "react-icons/hi";
import * as yup from "yup";

export const SearchAndFilter = () => {
	const schema = yup.object().shape({
		search: yup.string().notRequired(),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
		control,
		reset,
		watch,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const watchSearch = watch("search");

	return (
		<div className="flex w-full justify-center items-end gap-4 flex-wrap md:flex-nowrap">
			<Select
				name="filter"
				label="Status   "
				control={control}
				classNameRoot="flex-1 md:min-w-[200px] md:max-w-[100px]"
				options={[
					{ value: "all", label: "Todos" },
					{ value: "active", label: "Ativo" },
					{ value: "inactive", label: "Inativo" },
				]}
			/>

			<Input
				leftIcon={<HiOutlineUser size={20} className="text-gray-600" />}
				classNameRoot="flex-1 md:min-w-[200px]"
				name="search"
				label="Pesquisar"
				placeholder="Pesquise um usuário"
				control={control}
				rightIcon={
					watchSearch?.length ? (
						<HiOutlineXCircle
							size={20}
							className="text-gray-600 cursor-pointer"
							onClick={() => reset({ search: "" })}
						/>
					) : null
				}
			/>
			<div className="flex-1 md:min-w-[200px] md:max-w-[100px]">
				<Button className="">Pesquisar</Button>
			</div>
		</div>
	);
};
