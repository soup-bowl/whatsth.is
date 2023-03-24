
import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { IInspectionDetails } from "../interfaces";
import { ServiceIcon } from "./ServiceIcon";

interface Props {
	details?: IInspectionDetails;
}

const DetailCard = ({ details }: Props) => {
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

export default DetailCard;
