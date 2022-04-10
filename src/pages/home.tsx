import { useState, useEffect } from 'react';
import {Button, TextField, Grid, Typography, CircularProgress, Box} from '@mui/material';
import agent from '../api/agent';
import {useNavigate} from 'react-router-dom';

const Home = () => {
	const [inputURL, setInputURL] = useState('');
	const navigate = useNavigate();

	const submitForm = (e:any) => {
		e.preventDefault();
		return navigate('/url/' + inputURL);
	};

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

	let isStuffy = (
		<Grid container spacing={0} my={2} direction="column" alignItems="center">
			<Grid item xs={3}>
				<CircularProgress />
			</Grid>
		</Grid>
	);

	if (!loadingStats) {
		if (siteStats.success) {
			isStuffy = (
				<Grid item>
					<Typography>
						There has been <Box component="span" fontWeight='700'>{siteStats.counts.year}</Box> scans this year,
						with <Box component="span" fontWeight='700'>{siteStats.counts.week}</Box> performed this week.
					</Typography>
					<Typography color="darkgrey">No identifyiable information is collected, just anonymous usage stats.</Typography>
				</Grid>
			);
		} else {
			isStuffy = (
				<Grid item>
					<Typography color="darkgrey">Could not load stats.</Typography>
				</Grid>
			);
		}
	}

	return (
		<>
			<Typography variant="h3" component="h1" my={2}>What's this?</Typography>
			<form onSubmit={submitForm}>
				<Grid container direction="column" spacing={2}>
					<Grid item>
						<Typography my={2}>
							We will try to pick details out of the URL you specify.
						</Typography>
					</Grid>
					<Grid item>
						<TextField fullWidth id="url" type="url" placeholder="https://wordpress.org" label="URL" variant="outlined" onChange={(e) => setInputURL(e.target.value)} />
						<Typography color="lightgrey">Remember to include the protocol. If you're unsure, it's normally https:// !</Typography>
					</Grid>
					<Grid item>
						<Button type="submit" variant="contained" value="Submit">Submit</Button>
					</Grid>
					{isStuffy}
				</Grid>
			</form>
		</>
	);
};

export default Home;
