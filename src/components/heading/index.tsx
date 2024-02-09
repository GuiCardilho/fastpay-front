import { HiOutlineChevronRight } from "react-icons/hi";
import { Button, ButtonProps } from "../button";

interface IProps {
	title: string;
	subtitle?: string;
	icon?: React.ReactNode;
	button?: ButtonProps;
	breadcrumb?: {
		label: string;
		link: string;
	}[];
}

export const Heading = ({
	icon,
	title,
	subtitle,
	button,
	breadcrumb,
}: IProps) => {
	return (
		<div className="bg-white rounded-md p-4 flex gap-4 justify-between items-center">
			<div className="flex justify-center items-center gap-4">
				<div className="flex flex-col gap-4 text-sm">
					<div>
						{breadcrumb && (
							<div className="flex gap-2">
								{breadcrumb.map((item, index) => (
									<a
										key={item.label}
										href={item.link}
										className="text-blue-500 hover:underline flex gap-2 justify-center items-center transition-all duration-300 ease-in-out"
									>
										{item.label}

										{index < breadcrumb.length - 1 && (
											<span className="text-gray-500">
												<HiOutlineChevronRight
													className="text-blue-500"
													size={16}
												/>
											</span>
										)}
									</a>
								))}
							</div>
						)}
					</div>

					<div className="flex gap-2">
						{icon}
						<div className="flex flex-col ">
							<span className="text-gray-500 text-md font-medium items-center">
								{subtitle}
							</span>
							<h1 className="text-3xl font-bold">{title}</h1>
						</div>
					</div>
				</div>
			</div>

			{button && (
				<div>
					<Button {...button}>{button?.children}</Button>
				</div>
			)}
		</div>
	);
};
