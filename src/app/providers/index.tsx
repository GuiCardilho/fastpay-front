"use client";

import { ToastContainer } from "react-toastify";
import { ReactQueryProvider } from "./react-query";

export const Providers = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<ReactQueryProvider>
			{children}
			<ToastContainer />
		</ReactQueryProvider>
	);
};
