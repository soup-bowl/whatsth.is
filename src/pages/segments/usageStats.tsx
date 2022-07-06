import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../api/agent";

export default function UsageStats() {
	const [siteStats, setSiteStats]       = useState<any>([]);
	const [loadingStats, setLoadingStats] = useState<boolean>(true);

	useEffect(() => {
		agent.Details.stats().then(response => {
			setSiteStats(response);
			setLoadingStats(false);
		}).catch((err: any) => {
			setLoadingStats(false);
		});
	}, []);

	if (!loadingStats) {
		if (siteStats.success) {
			return (
				<>
				<Typography>
					There has been <Box component="span" fontWeight='700'>{siteStats.inspection_usage.year}</Box> scans this year,
					with <Box component="span" fontWeight='700'>{siteStats.inspection_usage.week}</Box> performed this week.
				</Typography>
				<Typography color="darkgrey">No identifyiable information is collected, just anonymous usage stats.</Typography>
				</>
			);
		} else {
			return (
				<Typography color="darkgrey">Could not load stats.</Typography>
			);
		}
	} else {
		return (
			<Grid container spacing={0} my={2} direction="column" alignItems="center">
				<Grid item xs={3}>
					<CircularProgress />
				</Grid>
			</Grid>
		);
	}
}
