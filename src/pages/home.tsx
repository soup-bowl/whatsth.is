import { Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Box, Paper, Link } from '@mui/material';

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CachedIcon from '@mui/icons-material/Cached';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: '#121212',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));

export default function Home() {
	const navigate = useNavigate();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Typography variant="h3" component="h1" my={2}>What's This? Toolbox</Typography>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item xs={6}>
					<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate('/inspect')}>
						<Item>
							<TravelExploreIcon fontSize="large" />
							<Typography>Site Inspector</Typography>
						</Item>
					</Link>
				</Grid>
				<Grid item xs={6}>
					<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate('/decoder')}>
						<Item>
							<CachedIcon fontSize="large" />
							<Typography>Encode / Decode</Typography>
						</Item>
					</Link>
				</Grid>
			</Grid>
		</Box>
	)
}
