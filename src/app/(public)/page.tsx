"use client";

import { cn } from "@/utils/tailwind";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "./components/loginForm";
import { RegisterForm } from "./components/registerForm";
import { ResetPasswordForm } from "./components/resetPasswordForm";

export type SelectSection = "register" | "login" | "resetPassword";

export default function Page() {
	const searchParams = useSearchParams();
	const [section, setSection] = useState<
		"register" | "login" | "resetPassword"
	>((searchParams.get("section") as SelectSection) || "login");

	const variantsLogin = {
		hiddenInitial: { x: "100%" },
		hidden: { x: "50%" },
		visible: { x: 0 },
	};

	const variantsRegister = {
		hiddenInitial: { x: "-100%" },
		hidden: { x: "-50%" },
		visible: { x: 0 },
	};

	const variantsResetPassword = {
		hiddenInitial: { x: 0, y: "-100%" },
		hidden: { x: 0, y: "-100%" },
		visible: { x: 0, y: 0 },
	};

	return (
		<main className="flex overflow-hidden">
			<div className="absolute top-0 bottom-0 right-0 left-0 bg-login opacity-90" />

			<AnimatePresence>
				<motion.main
					initial="hiddenInitial"
					animate={section === "login" ? "visible" : "hidden"}
					exit="hidden"
					variants={variantsLogin}
					transition={{ duration: 0.4 }}
					className={cn("flex min-h-screen flex-1 w-screen items-center", {
						hidden: section !== "login",
					})}
				>
					<div className="w-full md:w-1/2 flex flex-col justify-center items-start h-[100svh] transition-all lg:px-20 sm:px-10 px-6 gap-8 bg-white relative z-10">
						<div className="flex flex-col gap-1">
							<div className="text-2xl font-bold">
								Seja bem-vindo a plataforma
							</div>
							<p className="text-gray-500 text-md font-medium">
								Faça login para continuar
							</p>
						</div>

						<LoginForm
							toggleLogin={(param) => {
								setSection(param);
							}}
						/>
					</div>

					<div className="w-1/2 hidden md:flex h-[100svh] justify-center items-center" />
				</motion.main>

				<motion.main
					initial="hiddenInitial"
					animate={section === "register" ? "visible" : "hidden"}
					exit="hidden"
					variants={variantsRegister}
					transition={{ duration: 0.4 }}
					className={cn("flex min-h-screen flex-1 w-screen items-center", {
						hidden: section !== "register",
					})}
				>
					<div className="w-1/2 hidden md:flex h-[100svh] justify-center items-center" />
					<div className="w-full md:w-1/2 flex flex-col justify-center items-start h-[100svh] transition-all lg:px-20 sm:px-10 px-6 gap-8 bg-white relative z-10">
						<div className="flex flex-col gap-1">
							<div className="text-2xl font-bold">
								Faça parte da nossa plataforma
							</div>
							<p className="text-gray-500 text-md font-medium">
								Preencha os campos para continuar
							</p>
						</div>

						<RegisterForm
							toggleLogin={() => {
								setSection("login");
							}}
						/>
					</div>
				</motion.main>

				<motion.main
					initial="hiddenInitial"
					animate={section === "resetPassword" ? "visible" : "hidden"}
					exit="hidden"
					variants={variantsResetPassword}
					transition={{ duration: 0.4 }}
					className={cn("flex min-h-screen flex-1 w-screen items-center", {
						hidden: section !== "resetPassword",
					})}
				>
					<div className="w-full flex flex-col justify-center items-start h-[100svh] transition-all lg:px-20 sm:px-10 px-6 gap-8 bg-white relative z-10">
						<div className="flex flex-col gap-1">
							<div className="text-2xl font-bold">Resete sua senha</div>
							<p className="text-gray-500 text-md font-medium">
								Preencha os campos para continuar
							</p>
						</div>

						<ResetPasswordForm
							toggleLogin={() => {
								setSection("login");
							}}
						/>
					</div>
				</motion.main>
			</AnimatePresence>
		</main>
	);
}
