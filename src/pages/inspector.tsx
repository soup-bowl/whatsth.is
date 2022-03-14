import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import agent from '../api/agent';
import LoadingComponent from '../theme/loadingComponent';

const Inspector = () => {
	let inspectionURL = window.location.pathname.slice(5);
	const navigate    = useNavigate();
	const [siteDetails, setSiteDetails] = useState<any>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		agent.Details.firstCheck(inspectionURL).then(response => {
			setSiteDetails(response);
		});
		setLoading(false);
	}, [inspectionURL]);

	if (loading) return <LoadingComponent content='Loading...' />

	return (
		<Box>
			{siteDetails.success ? (
				<>
					{siteDetails.message.technology !== "Unknown" ? (
						<>
							<Typography variant="h4" component="h1" my={2}>{inspectionURL} is built with {siteDetails.message.technology}!</Typography>
							<Typography my={2}>Assumption made on <Box component="span" fontWeight='700'>{siteDetails.message.matched_on.length}</Box> matches.</Typography>
						</>
					) : (
						<>
							<Typography variant="h4" component="h1" my={2}>We couldn't detect the CMS used for {inspectionURL}</Typography>
						</>
					)}
				</>
			) : (
				<>
					<Typography variant="h4" component="h1" my={2}>Failed to detect {inspectionURL}...</Typography>
					<Typography my={2}>Check to make sure the site exists and is responding to public requests.</Typography>
				</>
			)}
			<Button variant="contained" value="Return" onClick={() => navigate('/')}>Check Another Site</Button>
		</Box>
	);
};

export default Inspector;
