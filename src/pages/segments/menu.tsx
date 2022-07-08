import { Divider, Grid, Link, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DnsIcon from '@mui/icons-material/Dns';
import CachedIcon from '@mui/icons-material/Cached';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimelapseIcon from '@mui/icons-material/Timelapse';

interface props {
	onlineState: boolean;
	drawerClose: any;
}

interface IMenu {
	name: string;
	icon: JSX.Element;
	url: string;
	needsInternet: boolean;
}

const getMenu:IMenu[] = [
	{
		name: 'Site Inspector',
		icon: <TravelExploreIcon />,
		url: '/inspect',
		needsInternet: true,
	},
	{
		name: 'DNS Inspector',
		icon: <DnsIcon />,
		url: '/dns',
		needsInternet: true,
	},
	{
		name: 'String Conversion',
		icon: <CachedIcon />,
		url: '/convert',
		needsInternet: false,
	},
	{
		name: 'Cron Calculator',
		icon: <AccessTimeIcon />,
		url: '/cron',
		needsInternet: false,
	},
	{
		name: 'Unix Timestamp',
		icon: <TimelapseIcon />,
		url: '/time',
		needsInternet: false,
	}
];

export function DrawMenu({onlineState, drawerClose}:props) {
	const navigate = useNavigate();

	return(
		<List>
			<ListItemButton
				key={0}
				onClick={() => {navigate('/');drawerClose();}}
				selected={(window.location.hash.replace('/', '') === "#")}
			>
				<ListItemIcon><HomeIcon /></ListItemIcon>
				<ListItemText primary="Home" />
			</ListItemButton>
			<Divider />
			<>
			{getMenu.map((item:IMenu, i:number) => {
				return(
					<ListItemButton
						key={(i + 1)}
						onClick={() => {navigate(item.url);drawerClose();}}
						disabled={!onlineState}
						selected={window.location.hash.includes(`${item.url}`)}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.name} />
					</ListItemButton>
				);
			})}
			</>
		</List>
	);
}

export function HomeMenu() {
	const navigate = useNavigate();

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: '#121212',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}));

	return(
		<>
			{getMenu.map((item:IMenu, i:number) => {
				return(
					<Grid key={i} item xs={6}>
						<Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => navigate(item.url)}>
							<Item>
								{item.icon}
								<Typography>{item.name}</Typography>
							</Item>
						</Link>
					</Grid>
				);
			})}
		</>
	);
}
