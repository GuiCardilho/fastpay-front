import Link from "next/link";

export default function Page() {
	return (
		<div className="flex bg-white justify-center items-center h-[100vh] w-[100vw]">
			<div className="text-4xl font-bold  text-gray-600 flex flex-col justify-center items-center gap-4">
				<span className="text-9xl font-bold text-black">404</span>
				<h1 className="text-black">Pagina não encontrada</h1>
				<Link
					href="/"
					className="text-lg text-normal text-gray-400 hover:text-blue-500  transition-all duration-300 ease-in-out cursor-pointer active:text-blue-700"
				>
					Voltar para a página inicial
				</Link>
			</div>
		</div>
	);
}
