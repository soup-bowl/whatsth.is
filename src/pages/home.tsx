import { useState } from 'react';
import {Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Home = () => {
	const [inputURL, setInputURL] = useState('');
	const navigate = useNavigate();
	return (
		<>
			<TextField fullWidth id="url" label="URL" variant="outlined" onChange={(e) => setInputURL(e.target.value)} />
			<Button variant="contained" value="Submit" onClick={() =>  navigate('/url/' + inputURL)}>Submit</Button>
			<a className="App-link" href="https://github.com/soup-bowl/whatsth.is">Source</a>
		</>
	);
  };
  
export default Home;
