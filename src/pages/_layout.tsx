import { Outlet, useNavigate } from "react-router-dom";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { CssBaseline, ThemeProvider, Toolbar, IconButton, Typography,
	Container, styled, Drawer, Divider, Box, List, ListItem, ListItemIcon,
	ListItemText, Link} from '@mui/material';
import theme from "../theme/theme";
import { useEffect, useState } from "react";

import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import CachedIcon from '@mui/icons-material/Cached';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function Layout() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [connectionState, setConnectionState] = useState(true);
	const MINUTE_MS = 15000;

	// https://stackoverflow.com/a/65049865
	useEffect(() => {
		const interval = setInterval(() => {
			if (navigator.onLine) {
				setConnectionState(true);
			} else {
				setConnectionState(false);
			}
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, []);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">What's this?</Typography>
					{ ! connectionState ?
					<CloudOffIcon color="disabled" sx={{ marginLeft: 1 }} />
					: null }
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<Typography>{process.env.REACT_APP_VERSION}</Typography>&nbsp;
					{ process.env.REACT_APP_BETA === "1" ?
					<Typography sx={{ color: 'darkgrey', fontVariant: 'small-caps' }}>BETA</Typography>
					: null }
					<IconButton onClick={handleDrawerClose}>
						<MenuIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItem button onClick={() => {navigate('/');handleDrawerClose();}}>
						<ListItemIcon><HomeIcon /></ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem button onClick={() => {navigate('/inspect');handleDrawerClose();}} disabled={!connectionState}>
						<ListItemIcon><TravelExploreIcon /></ListItemIcon>
						<ListItemText primary="Site Inspector" />
					</ListItem>
					<ListItem button onClick={() => {navigate('/convert');handleDrawerClose();}}>
						<ListItemIcon><CachedIcon /></ListItemIcon>
						<ListItemText primary="String Conversion" />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button onClick={() => {navigate('/help');handleDrawerClose();}}>
						<ListItemIcon><HelpIcon /></ListItemIcon>
						<ListItemText primary="Help" />
					</ListItem>
					<ListItem button component={Link} href="https://soupbowl.io/projects/whatsthis">
						<ListItemIcon><CodeIcon /></ListItemIcon>
						<ListItemText primary="Made by Soupbowl" />
					</ListItem>
					<ListItem button component={Link} href="https://github.com/soup-bowl/whatsth.is">
						<ListItemIcon><GitHubIcon /></ListItemIcon>
						<ListItemText primary="Source Code" />
					</ListItem>
				</List>
			</Drawer>
			<Main open={open}>
        		<DrawerHeader />
				<Container maxWidth="md">
					<Outlet />
				</Container>
			</Main>
			</Box>
		</ThemeProvider>
	)
};
