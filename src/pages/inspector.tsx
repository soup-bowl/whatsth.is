import { useState, useEffect } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import agent from '../api/agent';
import Generic from './technology/generic';
import ErrorMessage from './segments/errorMessage';
import WordPress from './technology/wordpress';

export default function Inspector() {
	let inspectionURL = window.location.pathname.slice(5);

	const [siteDetails, setSiteDetails] = useState<any>([]);
	const [loading, setLoading]         = useState<boolean>(true);
	const [requestError, setRError]     = useState<boolean>(false);

	useEffect(() => {
		agent.Details.firstCheck(inspectionURL).then(response => {
			setSiteDetails(response);
			setLoading(false);
		}).catch((err: any) => {
			setRError(true);
			setLoading(false);
		});
	}, [inspectionURL]);

	if (loading) {
		return (
			<Grid container spacing={0} my={2} direction="column" alignItems="center">
				<Grid item xs={3}>
					<CircularProgress />
				</Grid>
				<Grid item xs={3}>
					<Typography>Inspecting the site...</Typography>
				</Grid>
			</Grid>
		);
	}

	if (requestError || siteDetails.success === false) {
		return (
			<>
				<ErrorMessage
					title={"Failed to detect " + inspectionURL + "..."}
					message="Check to make sure the site exists and is responding to public requests."
				/>
			</>
		);
	}

	let contentModule:any;
	switch (siteDetails.message.technology) {
		case 'WordPress':
			contentModule = (<WordPress url={inspectionURL} inspection={siteDetails} />);
			break;
		case 'Unknown':
			contentModule = (<ErrorMessage title={"We couldn't detect the CMS used for " + siteDetails.message.name} />);
			break;
		default:
			contentModule = (<Generic url={inspectionURL} inspection={siteDetails} />);
			break;
	}

	return (
		<Box>
			<Typography my={1} color="darkgrey">For the URL {inspectionURL} ...</Typography>
			{contentModule}
		</Box>
	);
};
