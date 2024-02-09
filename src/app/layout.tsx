import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";

import "./globals.css";
import { Providers } from "./providers";

const inter = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
			<body className={`${inter.className} bg-initial-notebook bg-cover`}>
				<Providers>
					<Suspense>{children}</Suspense>
				</Providers>
			</body>
		</html>
	);
}
