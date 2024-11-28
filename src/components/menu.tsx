import {
	Box,
	Chip,
	Divider,
	Grid,
	IconButton,
	Link,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	styled,
	Theme,
	Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { IMenu, IMenuCategory } from "../interfaces"

import {
	Brightness4 as Brightness4Icon,
	Brightness7 as Brightness7Icon,
	Home as HomeIcon,
	TravelExplore as TravelExploreIcon,
	Dns as DnsIcon,
	Cached as CachedIcon,
	AccessTime as AccessTimeIcon,
	Timelapse as TimelapseIcon,
	Help as HelpIcon,
	CoPresent as CoPresentIcon,
	ColorLens as ColorLensIcon,
	NoteAlt as NoteAltIcon,
} from "@mui/icons-material"

import { useContext } from "react"
import { ConnectionContext } from "../context"

interface MenuProps {
	theme: Theme
	drawerClose: () => void
	colorMode: { toggleColorMode: () => void }
}

enum Category {
	Inspection,
	Conversion,
	Tools,
}

const ResizableIconButton = ({ ...props }) => {
	return (
		<IconButton
			sx={{
				"& svg": {
					fontSize: 38,
				},
			}}
			disableRipple
			{...props}
		/>
	)
}

const getMenuCategories: IMenuCategory[] = [
	{
		id: Category.Inspection,
		name: "Inspection Tools",
		description: "These tools require an internet connection.",
	},
	{
		id: Category.Conversion,
		name: "Conversion",
	},
	{
		id: Category.Tools,
		name: "Tools",
	},
]

const getMenu: IMenu[] = [
	{
		name: "Site Inspector",
		icon: <TravelExploreIcon />,
		category: Category.Inspection,
		url: "/inspect",
		needsInternet: true,
		beta: true,
	},
	{
		name: "Domain Tools",
		icon: <DnsIcon />,
		category: Category.Inspection,
		url: "/domain",
		needsInternet: true,
		beta: true,
	},
	{
		name: "String Conversion",
		icon: <CachedIcon />,
		category: Category.Conversion,
		url: "/convert",
		needsInternet: false,
	},
	{
		name: "Colour Picker",
		icon: <ColorLensIcon />,
		category: Category.Conversion,
		url: "/colour",
		needsInternet: false,
	},
	{
		name: "Cron Calculator",
		icon: <AccessTimeIcon />,
		category: Category.Conversion,
		url: "/cron",
		needsInternet: false,
	},
	{
		name: "Unix Timestamp",
		icon: <TimelapseIcon />,
		category: Category.Conversion,
		url: "/time",
		needsInternet: false,
	},
	{
		name: "Scratchpad",
		icon: <NoteAltIcon />,
		category: Category.Tools,
		url: "/scratchpad",
		needsInternet: false,
		beta: true,
	},
]

export const DrawMenu = ({ drawerClose, theme, colorMode }: MenuProps) => {
	const { connectionState } = useContext(ConnectionContext)
	const navigate = useNavigate()

	const MenuNav = (url: string) => {
		navigate(url)
		drawerClose()
	}

	return (
		<List>
			<ListItemButton key={0} onClick={() => MenuNav("/")} selected={window.location.hash.replace("/", "") === "#"}>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItemButton>
			<Divider />
			{getMenu.map((item: IMenu, i: number) => {
				return (
					<ListItemButton
						key={i + 1}
						onClick={() => MenuNav(item.url)}
						disabled={item.needsInternet ? !connectionState : false}
						selected={window.location.hash.includes(`${item.url}`)}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.name} />
						{item.beta && <Chip label="Beta" size="small" color="info" sx={{ marginLeft: "2px" }} />}
					</ListItemButton>
				)
			})}
			<Divider />
			<ListItemButton onClick={colorMode.toggleColorMode}>
				<ListItemIcon>{theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}</ListItemIcon>
				<ListItemText primary={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"} />
			</ListItemButton>
			<ListItemButton onClick={() => MenuNav("/help")} selected={window.location.hash.includes("/help")}>
				<ListItemIcon>
					<HelpIcon />
				</ListItemIcon>
				<ListItemText primary="Help" />
			</ListItemButton>
			<ListItemButton onClick={() => MenuNav("/about")} selected={window.location.hash.includes("/about")}>
				<ListItemIcon>
					<CoPresentIcon />
				</ListItemIcon>
				<ListItemText primary="About" />
			</ListItemButton>
		</List>
	)
}

const OptionSquare = styled(Paper)({
	padding: 1,
	margin: 1,
	display: "flex",
	flexDirection: "column",
	textAlign: "center",
	justifyContent: "center",
	alignItems: "center",
	maxWidth: "200px",
	minHeight: "125px",
})

export const HomeMenu = () => {
	const { connectionState } = useContext(ConnectionContext)
	const navigate = useNavigate()

	return (
		<>
			{getMenuCategories.map((item: IMenuCategory) => {
				return (
					<Box key={item.id}>
						<Typography variant="h4" component="h2" my={2}>
							{item.name}
						</Typography>
						{item.description !== undefined && <Typography my={2}>{item.description}</Typography>}
						<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							{getMenu.map((subitem: IMenu) => {
								if (subitem.category === item.id) {
									return (
										<Grid key={subitem.name} item xs={6} md={3}>
											<Link
												sx={{
													cursor: subitem.needsInternet && !connectionState ? "default" : "pointer",
													textDecoration: "none",
												}}
												onClick={() => navigate(subitem.url)}
											>
												<OptionSquare elevation={3}>
													<ResizableIconButton>{subitem.icon}</ResizableIconButton>
													<Typography>{subitem.name}</Typography>
													{subitem.beta && <Chip label="Beta" size="small" color="info" sx={{ marginLeft: "2px" }} />}
												</OptionSquare>
											</Link>
										</Grid>
									)
								} else {
									return undefined
								}
							})}
						</Grid>
					</Box>
				)
			})}
		</>
	)
}
