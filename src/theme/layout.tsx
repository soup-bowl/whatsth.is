import { Outlet } from "react-router-dom"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import {
	CssBaseline,
	ThemeProvider,
	Toolbar,
	IconButton,
	Typography,
	Container,
	styled,
	Drawer,
	Box,
	useMediaQuery,
	PaletteMode,
	createTheme,
} from "@mui/material"
import { useContext, useMemo, useState } from "react"

import MenuIcon from "@mui/icons-material/Menu"
import CloudOffIcon from "@mui/icons-material/CloudOff"
import { DrawMenu } from "../components"
import { purple } from "@mui/material/colors"
import { ConnectionContext } from "../context"

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
	open?: boolean
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}))

const Layout = () => {
	const { connectionState } = useContext(ConnectionContext)
	const [open, setOpen] = useState(false)
	const desktop = useMediaQuery("(min-width: 961px)")

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const [mode, setMode] = useState<string>(localStorage.getItem("ColourPref") ?? "dark")
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode: string) => {
					const cmode = prevMode === "light" ? "dark" : "light"
					localStorage.setItem("ColourPref", cmode)
					return cmode
				})
			},
		}),
		[]
	)

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					primary: purple,
					mode: mode as PaletteMode,
				},
				typography: {
					button: {
						textTransform: "none",
					},
					h1: {
						fontSize: "3.25rem",
					},
					h2: {
						fontSize: "2.75rem",
					},
					h3: {
						fontSize: "2rem",
					},
				},
			}),
		[mode]
	)

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline enableColorScheme />
				<AppBar
					position="fixed"
					open={open}
					sx={{
						backgroundColor: theme.palette.primary.main,
						zIndex: (theme) => (desktop ? theme.zIndex.drawer + 10 : 10),
					}}
				>
					<Toolbar>
						{!desktop && (
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								edge="start"
								sx={{ mr: 2, ...(open && { display: "none" }) }}
							>
								<MenuIcon />
							</IconButton>
						)}
						<Typography variant="h6" noWrap component="div">
							What's this?
						</Typography>
						{!connectionState && <CloudOffIcon color="disabled" sx={{ marginLeft: 1 }} />}
					</Toolbar>
				</AppBar>
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
					variant={desktop ? "permanent" : "temporary"}
					anchor="left"
					open={open}
					onClose={handleDrawerClose}
				>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							<MenuIcon />
						</IconButton>
					</DrawerHeader>
					<DrawMenu drawerClose={handleDrawerClose} colorMode={colorMode} theme={theme} />
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
}

export default Layout
