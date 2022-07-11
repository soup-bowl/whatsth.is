import { Typography, Box, Link } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { PageProps } from '../interfaces';
import { HomeMenu } from "./segments/menu";

export default function Home({online}:PageProps) {
	const navigate = useNavigate();

	useEffect(() => { document.title = "What's This?" });

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Typography variant="h1" my={2}>What's This? Toolbox</Typography>
			<Typography my={2}>
				Simple technology toolbox. For more information,&nbsp;
				<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate('/help')}>see the help page</Link>.
			</Typography>

			<HomeMenu onlineState={online} />
		</Box>
	)
}
