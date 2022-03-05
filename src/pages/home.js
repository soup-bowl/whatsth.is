import {Button, TextField} from '@mui/material';

const Home = () => {
	return (
		<>
			<TextField fullWidth id="url" label="URL" variant="outlined" />
			<Button variant="contained" value="Submit">Submit</Button>
			<a className="App-link" href="https://github.com/soup-bowl/whatsth.is">Source</a>
		</>
	);
  };
  
export default Home;
