import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Inspector = () => {
	let inspectionURL = window.location.pathname.slice(5);
	const navigate    = useNavigate();
	return (
		<>
			<h1>Results for: {inspectionURL}</h1>
			<Button variant="contained" value="Return" onClick={() => navigate('/')}>Return</Button>
		</>
	);
};

export default Inspector;
