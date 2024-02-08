import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "FastPay - Test",
	description: "Test carried out for Fastpay",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
