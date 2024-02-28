import { Outlet, useNavigate } from "react-router-dom";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
	CssBaseline, Toolbar, IconButton, Typography, Container,
	styled, Drawer, Box, useMediaQuery, Theme
} from '@mui/material';
import { useContext, useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import SettingsIcon from '@mui/icons-material/Settings';
import { DrawMenu } from "../components";
import { ConnectionContext } from "../context";
import { SettingsModel } from "../modals";

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

interface LayoutProps {
	theme: Theme;
	mode: any;
	setMode: any;
}

const Layout = ({ theme, mode, setMode }: LayoutProps) => {
	const navigate = useNavigate();
	const { connectionState } = useContext(ConnectionContext);
	const [open, setOpen] = useState(false);
	const desktop = useMediaQuery("(min-width: 961px)");

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline enableColorScheme />

			<AppBar
				position="fixed"
				open={open}
				sx={{
					backgroundColor: theme.palette.primary.main,
					zIndex: (theme) => (desktop ? theme.zIndex.drawer + 10 : 10)
				}}>
				<Toolbar>
					{!desktop &&
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(open && { display: 'none' }) }}
						>
							<MenuIcon />
						</IconButton>
					}
					<Typography variant="h6" noWrap component="div">What's this?</Typography>
					{!connectionState &&
						<CloudOffIcon color="disabled" sx={{ marginLeft: 1 }} />
					}
					<Typography sx={{ flexGrow: 1 }} />
					<SettingsModel mode={mode} setMode={setMode} />
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
				<DrawMenu drawerClose={handleDrawerClose} />
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<Container maxWidth="md">
					<Outlet />
				</Container>
			</Main>
		</Box>
	)
};

export default Layout;
