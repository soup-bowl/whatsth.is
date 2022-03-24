import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
	title: string;
	message?: string;
}

export default function ErrorMessage({title, message = ''}: Props) {
	const navigate = useNavigate();
	return(
		<>
			<Typography variant="h4" component="h1" my={2}>{title}</Typography>
			<Typography my={2}>{message}</Typography>
			<Button variant="contained" value="Return" onClick={() => navigate('/')}>Check Another Site</Button>
		</>
	);
};
