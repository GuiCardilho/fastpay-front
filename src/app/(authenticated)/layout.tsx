import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Suspense } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Suspense>
			<div className="flex w-full h-full bg-white">
				<Sidebar />
				<div className="w-full flex flex-col flex-1 h-full min-h-[100svh] bg-gray-100">
					<Navbar />
					<div className="flex flex-col w-full p-4">{children}</div>
				</div>
			</div>
		</Suspense>
	);
}
