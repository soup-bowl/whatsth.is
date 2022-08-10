import { Chip, Divider, Grid, Link, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { IMenu, IMenuCategory } from "../../interfaces";

import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DnsIcon from '@mui/icons-material/Dns';
import CachedIcon from '@mui/icons-material/Cached';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimelapseIcon from '@mui/icons-material/Timelapse';

interface props {
	onlineState: boolean;
	drawerClose?: any;
}

const getMenuCategories:IMenuCategory[] = [
	{
		id: 1,
		name: 'Inspection Tools',
		description: 'These tools require an internet connection.',
	},
	{
		id: 2,
		name: 'Conversion',
	}
];

const getMenu:IMenu[] = [
	{
		name: 'Site Inspector',
		icon: <TravelExploreIcon />,
		category: 1,
		url: '/inspect',
		needsInternet: true,
		beta: true,
	},
	{
		name: 'DNS Inspector',
		icon: <DnsIcon />,
		category: 1,
		url: '/dns',
		needsInternet: true,
		beta: true,
	},
	{
		name: 'String Conversion',
		icon: <CachedIcon />,
		category: 2,
		url: '/convert',
		needsInternet: false,
	},
	{
		name: 'Cron Calculator',
		icon: <AccessTimeIcon />,
		category: 2,
		url: '/cron',
		needsInternet: false,
	},
	{
		name: 'Unix Timestamp',
		icon: <TimelapseIcon />,
		category: 2,
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
						disabled={(item.needsInternet) ? !onlineState : false}
						selected={window.location.hash.includes(`${item.url}`)}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.name} />
						{item.beta ?
						<Chip label="Beta" size="small" color="info" sx={{marginLeft: '2px'}} />
						: null}
					</ListItemButton>
				);
			})}
			</>
		</List>
	);
}

export function HomeMenu({onlineState, drawerClose = undefined}:props) {
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
			{getMenuCategories.map((item:IMenuCategory, i:number) => {
				return(
					<>
					<Typography variant="h4" component="h2" my={2}>{item.name}</Typography>
					{ item.description !== undefined ?
					<Typography my={2}>{item.description}</Typography>
					: null }
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						{getMenu.map((subitem:IMenu, i:number) => {
							if (subitem.category === item.id) {
								return(
									<Grid key={i} item xs={6}>
										<Link
											sx={{
												cursor: (subitem.needsInternet && !onlineState) ? 'default' : 'pointer',
												textDecoration: 'none'
											}}
											onClick={() => navigate(subitem.url)}
										>
											<Item>
												{subitem.icon}
												<Typography>
													{subitem.name}
													{subitem.beta ?
													<Chip label="Beta" size="small" color="info" sx={{marginLeft: '2px'}} />
													: null}
												</Typography>
											</Item>
										</Link>
									</Grid>
								);
							} else {
								return undefined;
							}
						})}
					</Grid>
					</>
				);
			})}
		</>
	);
}
