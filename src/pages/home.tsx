import { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BrowserDetection from './segments/browserDetection';
import UsageStats from './segments/usageStats';

export default function Home() {
	const [inputURL, setInputURL] = useState('');
	const navigate = useNavigate();

	const submitForm = (e:any) => {
		e.preventDefault();
		return navigate('/url/' + inputURL);
	};

	const changeForm = (e:any) => {
		setInputURL(e.target.value);
	  };

	return (
		<>
			<Typography variant="h3" component="h1" my={2}>What's this?</Typography>
			<form onSubmit={submitForm}>
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
						<Typography color="lightgrey">Remember to include the protocol. If you're unsure, it's normally https:// !</Typography>
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
