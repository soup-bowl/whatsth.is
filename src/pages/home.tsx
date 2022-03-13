import { useState } from 'react';
import {Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Home = () => {
	const [inputURL, setInputURL] = useState('');
	const navigate = useNavigate();
	return (
		<>
			<form onSubmit={(e) => {e.preventDefault();return navigate('/url/' + inputURL);}}>
				<TextField fullWidth id="url" label="URL" variant="outlined" onChange={(e) => setInputURL(e.target.value)} />
				<Button type="submit" variant="contained" value="Submit">Submit</Button>
			</form>
			<a className="App-link" href="https://github.com/soup-bowl/whatsth.is">Source</a>
		</>
	);
};

export default Home;
