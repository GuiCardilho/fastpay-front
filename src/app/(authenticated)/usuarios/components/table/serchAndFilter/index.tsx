import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
	HiOutlineSearch,
	HiOutlineUser,
	HiOutlineXCircle,
} from "react-icons/hi";
import * as yup from "yup";

interface IProps {
	refetch: () => void;
	setLimit: (limit: number) => void;
	setSearch: (search: string) => void;
}

export const SearchAndFilter = ({ refetch, setLimit, setSearch }: IProps) => {
	const schema = yup.object().shape({
		search: yup.string().notRequired(),
		limit: yup.string().required(),
		status: yup.string().required(),
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
		<div className="flex w-full justify-center items-end gap-4 flex-wrap lg:flex-nowrap">
			<Select
				name="limit"
				label="Exibir"
				control={control}
				classNameRoot="flex-1 lg:min-w-[200px] lg:max-w-[100px]"
				options={[
					{ value: "5", label: "5" },
					{ value: "10", label: "10" },
					{ value: "15", label: "15" },
					{ value: "20", label: "20" },
				]}
				onChange={(e) => {
					console.log("e.target.value", e.target.value);
					setLimit(Number(e.target.value));
				}}
			/>

			<Input
				leftIcon={<HiOutlineUser size={20} className="text-gray-600" />}
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
				onChange={(e) => {
					console.log("e.target.value", e.target.value);
					setSearch(e.target.value);
				}}
			/>
			<div className="flex-1 lg:min-w-[200px] lg:max-w-[100px]">
				<Button className="" onClick={refetch}>
					<div className="flex gap-2 justify-center items-center">
						<HiOutlineSearch size={20} className="text-white" />
						Pesquisar
					</div>
				</Button>
			</div>
		</div>
	);
};
