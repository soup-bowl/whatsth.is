import { Outlet } from "react-router-dom";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
	CssBaseline, ThemeProvider, Toolbar, IconButton, Typography, Container,
	styled, Drawer, Box, useMediaQuery
} from '@mui/material';
import theme from "../theme/theme";
import { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { DrawMenu } from "./segments/menu";
import { PageProps } from "../interfaces";

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

export default function Layout({online}:PageProps) {
	const [open, setOpen] = useState(false);
	const desktop = useMediaQuery("(min-width: 961px)");

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
			<AppBar
				position="fixed"
				open={open}
				sx={{
					backgroundColor: theme.palette.primary.main,
					zIndex: (theme) => ( desktop ? theme.zIndex.drawer + 1 : 0)
				}}>
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
					{ ! online ?
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
				<DrawMenu onlineState={online} drawerClose={handleDrawerClose} />
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
