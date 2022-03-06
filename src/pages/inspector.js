import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Inspector = () => {
	let inspectionURL = window.location.pathname.slice(5);
	const navigate    = useNavigate();
	return (
		<>
			<p>{inspectionURL}</p>
			<Button variant="contained" value="Return" onClick={() => navigate('/')}>Return</Button>
		</>
	);
  };
  
export default Inspector;
