interface IProps {
	title: string;
	subtitle?: string;
}

export const Heading = ({ title, subtitle }: IProps) => {
	return (
		<div className="bg-white rounded-md p-4">
			<span className="text-gray-500 text-md font-medium">{subtitle}</span>
			<h1 className="text-3xl font-bold">{title}</h1>
		</div>
	);
};
