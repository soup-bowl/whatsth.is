import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import agent from '../api/agent';

const Inspector = () => {
	let inspectionURL = window.location.pathname.slice(5);
	const navigate    = useNavigate();
	const [siteDetails, setSiteDetails] = useState<any>([]);

	useEffect(() => {
		agent.Details.firstCheck(inspectionURL).then(response => {
			setSiteDetails(response);
		});
	}, [inspectionURL]);

	return (
		<>
			{siteDetails.success ? (
				<>
					{siteDetails.message.technology !== "Unknown" ? (
						<>
							<h2>{inspectionURL} is built with {siteDetails.message.technology}!</h2>
							<p>Assumption made on <strong>{siteDetails.message.matched_on.length}</strong> matches.</p>
						</>
					) : (
						<><h2>We couldn't detect the CMS used for {inspectionURL}</h2></>
					)}
				</>
			) : (
				<>
					<h2>Fail to detect {inspectionURL}...</h2>
					<p>Check to make sure the site exists and is responding to public requests.</p>
				</>
			)}
			<Button variant="contained" value="Return" onClick={() => navigate('/')}>Check Another Site</Button>
		</>
	);
};

export default Inspector;
