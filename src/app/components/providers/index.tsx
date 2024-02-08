import { ReactQueryProvider } from "./react-query";

export const Providers = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return <ReactQueryProvider>{children}</ReactQueryProvider>;
};
