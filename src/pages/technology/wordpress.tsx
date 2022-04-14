import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
	url: string;
	inspection: any;
}

export default function WordPress({url, inspection}: Props) {
	const navigate = useNavigate();

	if (inspection.message.additional !== null && inspection.message.additional.success) {
		let wp_api  = inspection.message.additional;
		let counts  = {'pt': 'no', 'pg': 'no', 'ct': 'no'};

		if (wp_api.post_count > -1) { counts.pt = String(wp_api.post_count) }
		if (wp_api.page_count > -1) { counts.pg = String(wp_api.page_count) }
		if (wp_api.cat_count  > -1) { counts.ct = String(wp_api.cat_count) }

		return(
			<>
				<Typography variant="h4" component="h1" my={2}>{wp_api.name} is built with {inspection.message.technology}!</Typography>
				<Typography>
					This site seems to contain&nbsp;
					<Box component="span" fontWeight='700'>{counts.pt}</Box> posts &&nbsp;
					<Box component="span" fontWeight='700'>{counts.pg}</Box> pages.
				</Typography>
				<Typography my={2}>Assumption made on <Box component="span" fontWeight='700'>{inspection.message.matched_on.length}</Box> matches.</Typography>
				<Typography my={2} color="darkgrey">Additional information scraped from their public REST API.</Typography>
				<Button variant="contained" value="Return" onClick={() => navigate('/')}>Check Another Site</Button>
			</>
		);
	} else {
		return(
			<>
				<Typography variant="h4" component="h1" my={2}>{inspection.message.name} is built with {inspection.message.technology}!</Typography>
				<Typography my={2}>Assumption made on <Box component="span" fontWeight='700'>{inspection.message.matched_on.length}</Box> matches.</Typography>
				<Typography my={2} color="darkgrey">We weren't able to probe their REST API.</Typography>
				<Button variant="contained" value="Return" onClick={() => navigate('/')}>Check Another Site</Button>
			</>
		);
	}
};
