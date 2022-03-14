import { useState } from 'react';
import {Button, TextField, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Home = () => {
	const [inputURL, setInputURL] = useState('');
	const navigate = useNavigate();

	const submitForm = (e:any) => {
		e.preventDefault();
		return navigate('/url/' + inputURL);
	};

	return (
		<>
			<h1>What's this?</h1>
			<form onSubmit={submitForm}>
				<Grid container direction="column" spacing={2}>
					<Grid item>
						<Typography>
							We will try to pick details out of the URL you specify.
						</Typography>
					</Grid>
					<Grid item>
						<TextField fullWidth id="url" label="URL" variant="outlined" onChange={(e) => setInputURL(e.target.value)} />
					</Grid>
					<Grid item>
						<Button type="submit" variant="contained" value="Submit">Submit</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default Home;
