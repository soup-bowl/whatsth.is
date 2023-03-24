import { useContext, useEffect, useState } from 'react';
import { Button, TextField, Grid, Typography, CircularProgress, Box, Alert, AlertTitle, Stack, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import agent from '../api/agent';
import { IInspectionDetails } from '../interfaces';
import { UserAgentModel } from '../components/modals';
import { ReportInspectionError } from '../components/reportButton';
import DetailCard from '../components/inspectModules';
import { ConnectionContext } from "../context";

const siteTitle = "Site Inspector";

export function InspectionHome() {
	const { connectionState } = useContext(ConnectionContext);
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
					disabled={!connectionState}
				/>
				<Box my={2}>
					<Stack spacing={2} direction="row">
						<Button
							type="submit"
							variant="contained"
							value="Submit"
							disabled={!connectionState}
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

interface Props {
	url: string;
}

export function InspectonResult({ url }: Props) {
	const navigate = useNavigate();
	const [siteDetails, setSiteDetails] = useState<IInspectionDetails[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [requestError, setRError] = useState<boolean>(false);

	useEffect(() => {
		const addSoftwareToList = (inspection: IInspectionDetails, type: string) => {
			let list = siteDetails;
			let newItem = inspection;
			newItem.type = type;
			list.push(newItem);
			setSiteDetails(list);
		}

		agent.Inspection.inspect(url)
			.then(response => {
				if (typeof response.message !== 'string') {
					if (response.message.technology.cms !== null) { addSoftwareToList(response.message.technology.cms, 'CMS') };
					if (response.message.technology.frontend !== null) { addSoftwareToList(response.message.technology.frontend, 'Frontend') };
					response.message.technology.javascript.forEach((res) => addSoftwareToList(res, 'JavaScript'));
					response.message.technology.cdn.forEach((res) => addSoftwareToList(res, 'CDN'));
					response.message.technology.seo.forEach((res) => addSoftwareToList(res, 'SEO'));
					response.message.technology.language.forEach((res) => addSoftwareToList(res, 'Language'));
					response.message.technology.server.forEach((res) => addSoftwareToList(res, 'Server'));
				}
			})
			.catch(() => setRError(true))
			.finally(() => setLoading(false));
	}, [url, siteDetails]);

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

	return (
		<Box>
			<Typography my={1} color="darkgrey">For the URL {url} ...</Typography>
			<Box my={2}>
				{!requestError ?
					<>
						{siteDetails.length > 0 ?
							<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
								{siteDetails.map((jslib, i) => {
									return (
										<Grid key={i} item xs={12} md={6}>
											<DetailCard details={jslib} />
										</Grid>
									);
								})}
							</Grid>
							:
							<Box>
								<Typography variant="h1" my={2}>Nothing detected!</Typography>
								<Typography my={1} color="darkgrey">
									We can see the site, but nothing was detected against our algorithms
								</Typography>
								<Typography>
									This can happen when the site uses technology not known by the system, or when the website is using
									methods to customise libraries and functions, which may not be understood by the algorithm.
								</Typography>
							</Box>
						}
					</>
					:
					<Box>
						<Typography variant="h1" my={2}>Access failed</Typography>
						<Typography my={1} color="darkgrey">For some reason, our API cannot access the specified URL</Typography>
						<Typography>
							Check to make sure the website you specified is a correct, valid address. This can also happen if the
							website has blocked us from scanning it.
						</Typography>
					</Box>}
			</Box>
			<Box>
				<Button variant="contained" value="Return" onClick={() => navigate('/inspect')}>Check Another Site</Button>
				<ReportInspectionError url={url} object={siteDetails} />
			</Box>
			<Typography my={1} color="darkgrey">
				All brand logos courtesy from <Link href="https://fontawesome.com/" target="_blank" rel="noopener">FontAwesome</Link>.
			</Typography>
		</Box>
	);
};

export function InspectonResultDisplay() {
	const inspectionURL = window.location.hash.slice(10);

	useEffect(() => { document.title = `${inspectionURL} - What's This?` });

	return (<InspectonResult url={inspectionURL} />);
}
