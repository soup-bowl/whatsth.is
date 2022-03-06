import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Inspector = () => {
	let inspectionURL = window.location.pathname.slice(5);
	const navigate    = useNavigate();
	const [foobar, setFoobar] = useState("not changed");

	useEffect(() => {
		const sourceIndex = async () => {
			const response = await fetch(inspectionURL);
			const data     = await response.text();
			console.log(data);
		}
		sourceIndex();
		setFoobar("changed");
	}, [inspectionURL]);

	return (
		<>
			<h2>Results for: {inspectionURL} | {foobar}</h2>
			<Button variant="contained" value="Return" onClick={() => navigate('/')}>Return</Button>
		</>
	);
};

export default Inspector;
