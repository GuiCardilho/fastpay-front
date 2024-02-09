"use client";

import { DialogModal } from "@/components/dialog";
import { Heading } from "@/components/heading";
import { api } from "@/services/api";
import { createToast } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineUser, HiOutlineXCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { IUser, TableUser } from "./components/table";

export interface IResponse {
	users?: IUser[] | null;
	totalItems: number;
	totalPage: number;
	limit: number;
	page: number;
}

export default function Page() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [search, setSearch] = useState("");

	const [modal, setModal] = useState(false);
	const [refetchList, setRefetchList] = useState(false);
	const [idUser, setIdUser] = useState("");

	const { data, isLoading } = useQuery({
		queryKey: ["users", { page, limit, refetchList }],
		queryFn: async () => {
			const { data } = await api.get<AxiosResponse<IResponse>>("/users", {
				params: {
					limit,
					page,
					filter: search || undefined,
				},
			});
			return data.data;
		},
	});

	const { mutate: deleteUser } = useMutation({
		mutationKey: ["deleteUser"],
		onMutate: async () => {
			await api.delete(`/users/${idUser}`);

			setRefetchList((prev) => !prev);

			const { message, ...option } = createToast({
				message: "Tarefa deletada com sucesso",
				options: {
					type: "success",
				},
			});
			//@ts-ignore
			toast(message, option);
			router.push("/usuarios");
		},
		onError: (error: any) => {
			console.log(error, "Errorr");
			setRefetchList((prev) => !prev);

			const { message, ...option } = createToast({
				message:
					typeof error.response.data.message === "string"
						? error.response.data.message
						: error.response.data.message[0] || "Erro ao cadastrar",
				options: {
					type: "error",
				},
			});
			//@ts-ignore
			toast(message, option);
		},
	});
	return (
		<div className="flex flex-col gap-4">
			<div className="bg-white rounded-md p-4">
				<Heading
					title="Usuarios"
					subtitle="Listagem de usuarios"
					breadcrumb={[{ label: "Usuarios", link: "/usuarios" }]}
					icon={<HiOutlineUser size={42} className="text-gray-600" />}
					button={{
						children: (
							<div className="flex gap-2 justify-center items-center">
								<HiOutlinePlus size={20} />
								Cadastrar
							</div>
						),
						onClick: () => {
							router.push("/usuarios/cadastrar");
						},
					}}
				/>
			</div>

			<div className="bg-white rounded-md p-4">
				<TableUser
					data={data?.users || []}
					isLoading={isLoading}
					limit={limit}
					page={page}
					totalPages={data?.totalPage || 1}
					totalItems={data?.totalItems || 0}
					refetch={() => setRefetchList((prev) => !prev)}
					setPagination={(page) => setPage(page)}
					setModal={setModal}
					setIdUser={setIdUser}
					setSearch={(search) => setSearch(search)}
					setLimit={(limit) => {
						setLimit(limit);
						setPage(1);
					}}
				/>
			</div>

			<DialogModal
				isOpen={modal}
				setIsOpen={setModal}
				title="Deletar usuario"
				description="Deseja realmente deletar esse usuario? Essa ação não poderá ser desfeita."
				icon={<HiOutlineXCircle size={42} className="text-red-500 " />}
				variant="danger"
				button={[
					{
						children: "Cancelar",
						onClick: () => setModal(false),
						variant: "secondary",
					},
					{
						children: "Deletar",
						onClick: () => {
							deleteUser();
							setModal(false);
						},
						variant: "danger",
					},
				]}
			/>
		</div>
	);
}
