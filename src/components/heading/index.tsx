interface IProps {
	title: string;
	subtitle?: string;
	icon?: React.ReactNode;
}

export const Heading = ({ icon, title, subtitle }: IProps) => {
	return (
		<div className="bg-white rounded-md p-4 flex items-center gap-4">
			{icon}
			<div className="flex flex-col gap-2">
				<span className="text-gray-500 text-md font-medium items-center">
					{subtitle}
				</span>
				<h1 className="text-3xl font-bold">{title}</h1>
			</div>
		</div>
	);
};
