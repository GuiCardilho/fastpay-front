"use client";

import { Loading } from "@/components/loading";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/ui/table";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { FooterTable } from "./footerTable";
import { PopoverTable } from "./popover/popover";
import { SearchAndFilter } from "./serchAndFilter";

export interface IUser {
	id: string;
	name: string;
	email: string;
	phone: string;
}

interface IProps {
	data: IUser[];
	isLoading: boolean;

	totalItems: number;
	limit: number;

	page: number;
	totalPages: number;

	setPagination: (page: number) => void;
	setLimit: (limit: number) => void;
	setModal: (value: boolean) => void;
	refetch: () => void;
	setSearch: (search: string) => void;
	setStatus: (status: string) => void;
	setIdTask: (id: string) => void;
}

export function TableUser({
	data,
	isLoading,
	page = 1,
	totalPages = 1,
	limit,
	totalItems = 0,
	setPagination,
	setModal,
	setLimit,
	setSearch,
	refetch,
	setStatus,
	setIdTask,
}: IProps) {
	const columns: ColumnDef<IUser>[] = [
		{
			accessorKey: "id",
			header: () => {
				return <span className="flex items-center w-full gap-4">ID</span>;
			},
		},
		{
			accessorKey: "name",
			header: () => {
				return <span className="flex items-center w-full gap-4">Nome</span>;
			},
		},
		{
			accessorKey: "phone",
			header: () => {
				return <span className="flex items-center w-full gap-4">Telefone</span>;
			},
		},
		{
			accessorKey: "email",
			header: () => {
				return <span className="flex items-center w-full gap-4">E-mail</span>;
			},
		},
		{
			accessorKey: "actions",
			header: () => {
				return <span className="flex items-center w-full gap-4">Ações</span>;
			},
			cell: ({ row }) => {
				return (
					<span className="flex items-center w-full gap-4">
						<PopoverTable
							{...row.original}
							setModal={setModal}
							setIdTask={setIdTask}
						/>
					</span>
				);
			},
		},
	];

	const table = useReactTable({
		data: data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="flex flex-col w-full gap-8">
			<SearchAndFilter
				refetch={refetch}
				setLimit={setLimit}
				setSearch={setSearch}
				setStatus={setStatus}
			/>

			<div className="rounded-[8px] shadow-sm border border-gray-200 bg-white dark:bg-gray-750 dark:border-gray-600 w-full lg:max-w-none max-w-[90vw] overflow-auto text-gray-950 dark:text-gray-400 ">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup: any) => (
							<TableRow
								key={headerGroup.id}
								className="border-gray-200 dark:border-gray-600"
							>
								{headerGroup.headers.map((header: any) => {
									return (
										<TableHead key={header.id} className="px-4">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									<Loading />
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row: any) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="py-4 border-gray-200 dark:border-gray-600"
								>
									{row.getVisibleCells().map((cell: any) => (
										<TableCell key={cell.id} className="px-4">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Não foi encontrado nenhum resultado
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<FooterTable
				count={data.length}
				total={totalItems}
				totalPages={totalPages}
				page={page}
				setPagination={setPagination}
			/>
		</div>
	);
}
