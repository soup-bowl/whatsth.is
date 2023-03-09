
import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { IInspectionDetails } from "../interfaces";
import { ServiceIcon } from "./ServiceIcon";

interface Props {
	details?: IInspectionDetails;
}

export function DisplayCMS({ details }: Props) {
	if (details === undefined || details === null) {
		return (
			<Card>
				<CardContent>
					<Typography variant="h2" component="div" sx={{ mb: 1.5, fontWeight: 'bold' }}>
						No CMS Detected :(
					</Typography>
					<Typography variant="body2">
						The specified website did not match any of our criteria. In most cases, this is because it has
						no identifable contents on the page.
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					based on {details.match_on.length} of {details.match_available} matches...
				</Typography>
				<Typography variant="h2" component="div" sx={{ mb: 1.5, fontWeight: 'bold' }}>
					<ServiceIcon name={details.name} /> {details.name}
				</Typography>
				<Typography variant="body2">
					{details.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button href={details.url} target="_blank" rel="noopener">
					Learn about {details.name}
				</Button>
			</CardActions>
		</Card>
	);
}

export function DisplaySecondary({ details }: Props) {
	if (details === undefined || details === null) {
		return (<></>);
	}

	return (
		<Card>
			<CardContent>
				<Typography variant="h3" component="div" sx={{ mb: 1.5 }}>
					<ServiceIcon name={details.name} /> {details.name}
				</Typography>
				<Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary">
					{details.type !== undefined &&
						<Chip
							label={details.type}
							size="small"
							color="secondary"
							sx={{ marginRight: 1 }}
						/>
					}
					{details.match_on.length} out of {details.match_available} matches
				</Typography>
				<Typography variant="body2">
					{details.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button href={details.url} target="_blank" rel="noopener">
					Learn more
				</Button>
			</CardActions>
		</Card>
	);
}
