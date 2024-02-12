import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
	HiOutlineClipboardList,
	HiOutlineSearch,
	HiOutlineXCircle,
} from "react-icons/hi";
import * as yup from "yup";

interface IProps {
	refetch: () => void;
	setLimit: (limit: number) => void;
	setSearch: (search: string) => void;
	setStatus: (status: string) => void;
}

export const SearchAndFilter = ({
	refetch,
	setLimit,
	setSearch,
	setStatus,
}: IProps) => {
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
		<div className="flex w-full justify-center items-end gap-4 flex-wrap md:flex-nowrap flex-col sm:flex-row ">
			<Select
				name="limit"
				label="Exibir"
				control={control}
				classNameRoot="flex-1 w-full md:min-w-[100px] md:max-w-[100px]"
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

			<Select
				name="status"
				label="Status"
				control={control}
				classNameRoot="flex-1 w-full md:min-w-[100px] md:max-w-[100px]"
				options={[
					{ value: "all", label: "Todos" },
					{ value: "active", label: "Ativo" },
					{ value: "inactive", label: "Inativo" },
				]}
				onChange={(e) => {
					console.log("e.target.value", e.target.value);
					setStatus(e.target.value);
				}}
			/>

			<Input
				leftIcon={
					<HiOutlineClipboardList size={20} className="text-gray-600" />
				}
				classNameRoot="flex-1 w-full md:min-w-[100px]"
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
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						refetch();
					}
				}}
			/>
			<div className="flex-1 md:min-w-[200px] md:max-w-[100px] w-full">
				<Button className="" onClick={refetch}>
					<div className="flex gap-2 justify-center items-center w-full">
						<HiOutlineSearch size={20} className="text-white" />
						Pesquisar
					</div>
				</Button>
			</div>
		</div>
	);
};
