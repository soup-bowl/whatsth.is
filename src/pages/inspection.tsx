import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import agent from '../api/agent';
import BrowserDetection from './segments/browserDetection';
import UsageStats from './segments/usageStats';
import ErrorMessage from './segments/errorMessage';
import Generic from './technology/generic';
import WordPress from './technology/wordpress';

export function InspectionHome() {
	const [inputURL, setInputURL] = useState('');
	const navigate = useNavigate();

	const submitForm = (e:any) => {
		e.preventDefault();
		return navigate('/inspect/' + inputURL);
	};

	const changeForm = (e:any) => {
		setInputURL(e.target.value);
	  };

	return (
		<>
			<Typography variant="h3" component="h1" my={2}>Site Inspector</Typography>
			<form onSubmit={submitForm} noValidate>
				<Grid container direction="column" spacing={2}>
					<Grid item>
						<Typography my={2}>We will try to pick details out of the URL you specify.</Typography>
					</Grid>
					<Grid item>
						<TextField fullWidth
							id="url"
							type="url"
							placeholder="https://wordpress.org"
							label="URL"
							variant="outlined"
							onChange={changeForm}
						/>
					</Grid>
					<Grid item>
						<Button type="submit" variant="contained" value="Submit">Submit</Button>
					</Grid>
					<Grid item>
						<BrowserDetection />
					</Grid>
					<Grid item>
						<UsageStats />
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export function InspectonResult() {
	let inspectionURL = window.location.pathname.slice(9);
	const navigate = useNavigate();

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
			contentModule = (<WordPress inspection={siteDetails} />);
			break;
		case 'Unknown':
			contentModule = (<ErrorMessage title={"We couldn't detect the CMS used for " + siteDetails.message.name} />);
			break;
		default:
			contentModule = (<Generic inspection={siteDetails} />);
			break;
	}

	return (
		<Box>
			<Typography my={1} color="darkgrey">For the URL {inspectionURL} ...</Typography>
			{contentModule}
			<Box>
				<Button variant="contained" value="Return" onClick={() => navigate('/inspect')}>Check Another Site</Button>
				<Button variant="outlined" color="error" sx={{marginLeft: 2}} href={`https://github.com/soup-bowl/api.whatsth.is/issues/new?template=report_detection.md&title=Failed+Detection+URL:+${inspectionURL}`} target="_blank">Report</Button>
			</Box>
		</Box>
	);
};
