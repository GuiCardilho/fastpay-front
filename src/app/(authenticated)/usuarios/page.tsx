import { Heading } from "@/components/heading";
import { TableUser } from "./components/table";

export default function Page() {
	return (
		<div className="flex flex-col gap-4">
			<div className="bg-white rounded-md p-4">
				<Heading title="Usuarios" subtitle="Listagem de usuarios" />
			</div>

			<div className="bg-white rounded-md p-4">
				<TableUser
					data={[
						{
							id: "1",
							name: "John Doe",
							email: "teste@teste.com",
							phone: "123456789",
						},
					]}
					isLoading={false}
				/>
			</div>
		</div>
	);
}
