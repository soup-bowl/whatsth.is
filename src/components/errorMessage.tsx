import { Typography } from "@mui/material";

interface Props {
	title: string;
	message?: string;
}

const ErrorMessage = ({ title, message = '' }: Props) => {
	return (
		<>
			<Typography variant="h1" my={2}>{title}</Typography>
			<Typography my={2}>{message}</Typography>
		</>
	);
};

export default ErrorMessage;
