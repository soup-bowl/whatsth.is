import { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import agent from '../api/agent';
import Generic from './technology/generic';
import ErrorMessage from './segments/errorMessage';

const Inspector = () => {
	let inspectionURL = window.location.pathname.slice(5);
	const navigate    = useNavigate();

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

	if (requestError) {
		return (
			<>
				<ErrorMessage
					title={"Could not reach " + inspectionURL}
					message="Please check the URL is correct or try again later."
				/>
			</>
		);
	}

	return (
		<Box>
			{siteDetails.success ? (
				<>
					{siteDetails.message.technology !== "Unknown" ? (
						<>
							<Generic url={inspectionURL} inspection={siteDetails} />
						</>
					) : (
						<>
							<ErrorMessage title={"We couldn't detect the CMS used for " + inspectionURL} />
						</>
					)}
				</>
			) : (
				<>
					<ErrorMessage
						title={"Failed to detect " + inspectionURL + "..."}
						message="Check to make sure the site exists and is responding to public requests."
					/>
				</>
			)}
		</Box>
	);
};

export default Inspector;
