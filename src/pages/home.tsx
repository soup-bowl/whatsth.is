import { Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Box, Paper, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DnsIcon from '@mui/icons-material/Dns';
import CachedIcon from '@mui/icons-material/Cached';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
			<Typography my={2}>
				Simple technology toolbox. For more information,&nbsp;
				<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate('/help')}>see the help page</Link>.
			</Typography>

			<Typography variant="h4" component="h2" my={2}>Inspection Tools</Typography>
			<Typography my={2}>These tools require an internet connection.</Typography>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item xs={6}>
					<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate('/inspect')}>
						<Item>
							<TravelExploreIcon fontSize="large" />
							<Typography>Site Technology</Typography>
						</Item>
					</Link>
				</Grid>
				<Grid item xs={6}>
					<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate('/dns')}>
						<Item>
							<DnsIcon fontSize="large" />
							<Typography>DNS</Typography>
						</Item>
					</Link>
				</Grid>
			</Grid>

			<Typography variant="h4" component="h2" my={2}>Conversion Tools</Typography>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item xs={6}>
					<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate('/decoder')}>
						<Item>
							<CachedIcon fontSize="large" />
							<Typography>String Conversions</Typography>
						</Item>
					</Link>
				</Grid>
				<Grid item xs={6}>
					<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate('/cron')}>
						<Item>
							<AccessTimeIcon fontSize="large" />
							<Typography>Cron Calculator</Typography>
						</Item>
					</Link>
				</Grid>
				<Grid item xs={6}>
					<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate('/time')}>
						<Item>
							<AccessTimeIcon fontSize="large" />
							<Typography>Unix Timestamp</Typography>
						</Item>
					</Link>
				</Grid>
			</Grid>
		</Box>
	)
}
