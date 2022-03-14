import { useState } from 'react';
import {Button, TextField, Grid} from '@mui/material';
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
			<form onSubmit={submitForm}>
				<Grid container alignItems="center" direction="column" spacing={2}>
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
