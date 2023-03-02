import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Typography, CircularProgress, Box, Alert, AlertTitle, Stack, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import agent from '../api/agent';
import ErrorMessage from '../components/errorMessage';
import { DisplayCMS, DisplaySecondary } from '../components/inspectModules';
import { IInspectionResult, PageProps } from '../interfaces';
import { UserAgentModel } from '../components/modals';
import { ReportInspectionError } from '../components/reportButton';

const siteTitle = "Site Inspector";

const segments = [
	{ name: 'JavaScript', funct: 'javascript' },
	{ name: 'SEO', funct: 'seo' },
	{ name: 'CDN', funct: 'cdn' },
];

export function InspectionHome({ online }: PageProps) {
	const [inputURL, setInputURL] = useState('');
	const navigate = useNavigate();

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	const submitForm = (e: any) => {
		e.preventDefault();
		return navigate('/inspect/' + inputURL);
	};

	const changeForm = (e: any) => {
		setInputURL(e.target.value);
	};

	return (
		<>
			<Typography variant="h1" my={2}>{siteTitle}</Typography>
			<Typography my={2}>We will try to pick details out of the URL you specify.</Typography>
			<Box my={2}>
				<Alert severity="info">
					<AlertTitle>Beta</AlertTitle>
					This is a <strong>beta</strong> service. Please use the feedback forms to let us know what is missing!
				</Alert>
			</Box>
			<form onSubmit={submitForm} noValidate>
				<TextField fullWidth
					id="url"
					type="url"
					placeholder="https://wordpress.org"
					label="URL"
					variant="outlined"
					onChange={changeForm}
					disabled={!online}
				/>
				<Box my={2}>
					<Stack spacing={2} direction="row">
						<Button
							type="submit"
							variant="contained"
							value="Submit"
							disabled={!online}
						>
							Submit
						</Button>
						<UserAgentModel />
					</Stack>
				</Box>
			</form>
		</>
	);
};

export function InspectonResult() {
	const inspectionURL = window.location.hash.slice(10);
	const navigate = useNavigate();

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	const [siteDetails, setSiteDetails] = useState<IInspectionResult>({} as IInspectionResult);
	const [loading, setLoading] = useState<boolean>(true);
	const [requestError, setRError] = useState<boolean>(false);

	useEffect(() => {
		agent.Inspection.inspect(inspectionURL).then(response => {
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

	if (typeof siteDetails.message !== 'string') {
		return (
			<Box>
				<Typography my={1} color="darkgrey">For the URL {inspectionURL} ...</Typography>
				<Box my={2}>
					<DisplayCMS details={siteDetails.message.technology.cms} />
				</Box>
				{segments.map(e => {
					if (typeof siteDetails.message !== 'string') {
						return (
							<>
								{/* @ts-ignore */}
								{siteDetails.message.technology[e.funct].length > 0 &&
									<Box my={2}>
										<Typography variant="h2" my={2}>{e.name}</Typography>
										<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
											{/* @ts-ignore */}
											{siteDetails.message.technology[e.funct].map((jslib, i) => {
												return (
													<Grid key={i} item xs={12} md={6}>
														<DisplaySecondary details={jslib} />
													</Grid>
												);
											})}
										</Grid>
									</Box>}
							</>
						);
					} else {
						return <></>;
					}
				})}
				<Box>
					<Button variant="contained" value="Return" onClick={() => navigate('/inspect')}>Check Another Site</Button>
					<ReportInspectionError url={inspectionURL} object={siteDetails} />
				</Box>
				<Typography my={1} color="darkgrey">
					All brand logos courtesy from <Link href="https://fontawesome.com/" target="_blank" rel="noopener">FontAwesome</Link>.
				</Typography>
			</Box>
		);
	} else {
		return (<Box>
			<Typography>an unknown error occurred.</Typography>
		</Box>);
	}
};
