import { Outlet, useNavigate } from "react-router-dom";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { CssBaseline, ThemeProvider, Toolbar, IconButton, Typography,
	Container, styled, Drawer, Divider, Box, List, ListItemIcon,
	ListItemText, useMediaQuery, ListItemButton} from '@mui/material';
import theme from "../theme/theme";
import { useEffect, useState } from "react";

import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { DrawMenu } from "./segments/menu";

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
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
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
	const desktop = useMediaQuery("(min-width: 961px)");
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
			<AppBar position="fixed" open={open} sx={{ zIndex: (theme) => ( desktop ? theme.zIndex.drawer + 1 : 0) }}>
				<Toolbar>
					{ ! desktop ?
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
					: null }
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
				variant={(desktop) ? "permanent" : "temporary"}
				anchor="left"
				open={open}
				onClose={handleDrawerClose}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						<MenuIcon />
					</IconButton>
				</DrawerHeader>
				<DrawMenu onlineState={connectionState} drawerClose={handleDrawerClose} />
				<Divider />
				<List>
					<ListItemButton
						onClick={() => {navigate('/help');handleDrawerClose();}}
						selected={window.location.hash.includes("/help")}
					>
						<ListItemIcon><HelpIcon /></ListItemIcon>
						<ListItemText primary="Help" />
					</ListItemButton>
					<ListItemButton
						onClick={() => {navigate('/about');handleDrawerClose();}}
						selected={window.location.hash.includes("/about")}
					>
						<ListItemIcon><CoPresentIcon /></ListItemIcon>
						<ListItemText primary="About" />
					</ListItemButton>
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
