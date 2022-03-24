import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
	url: string;
	inspection: any;
}

export default function Generic({url, inspection}: Props) {
	const navigate = useNavigate();
	return(
		<>
			<Typography variant="h4" component="h1" my={2}>{url} is built with {inspection.message.technology}!</Typography>
			<Typography my={2}>Assumption made on <Box component="span" fontWeight='700'>{inspection.message.matched_on.length}</Box> matches.</Typography>
			<Button variant="contained" value="Return" onClick={() => navigate('/')}>Check Another Site</Button>
		</>
	);
};
