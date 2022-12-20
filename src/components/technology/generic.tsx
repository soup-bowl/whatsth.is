import { Box, Typography } from "@mui/material";

interface Props {
	inspection: any;
}

export default function Generic({ inspection }: Props) {
	return (
		<>
			<Typography variant="h1" my={2}>{inspection.message.name} is built with {inspection.message.technology}!</Typography>
			<Typography my={2}>Assumption made on <Box component="span" fontWeight='700'>{inspection.message.matched_on.length}</Box> matches.</Typography>
		</>
	);
};
