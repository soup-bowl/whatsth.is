import { Box, Button, DialogContent, Grid, IconButton, Link, Stack, Switch, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { SyntheticEvent, useContext, useEffect, useMemo, useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./_shared";
import { WhatsThisLogo } from "../components";
import { ConnectionContext, useAPIContext } from "../context";
import { IStorage } from "../interfaces";
import { formatBytes } from "libwhatsthis";

import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';
import CachedIcon from '@mui/icons-material/Cached';
import CloudOffIcon from '@mui/icons-material/CloudOff';

interface ErrorCatch {
	code?: string;
	message?: string;
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const a11yProps = (index: number) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

interface Props {
	mode: any;
	setMode: any;
}

const SettingsModel = ({ mode, setMode }: Props) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [value, setValue] = useState(0);

	const { connectionState } = useContext(ConnectionContext);
	const { apiAgent } = useAPIContext();

	const [apiVersion, setApiVersion] = useState<string | JSX.Element>('');

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (connectionState) {
			apiAgent.Details.openapi().then(response => {
				setApiVersion(response.info.version);
			})
				.catch((err: ErrorCatch) => {
					setApiVersion(
						<Tooltip title={`(${err.code ?? 'N/A'}) ${err.message ?? 'N/A'}`}><span>Comms Error</span></Tooltip>
					);
				});
		} else {
			setApiVersion(<><CloudOffIcon fontSize="inherit" /> Offline</>);
		}
	}, [connectionState, apiAgent]);

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode: string) => {
				const cmode = (prevMode === 'light') ? 'dark' : 'light';
				localStorage.setItem('ColourPref', cmode);
				return cmode;
			});
		},
	}), []);

	const colourToBoolean = (input: string): boolean => ((input === 'light') ? false : true);

	return (
		<>
			<IconButton onClick={handleOpen}>
				<SettingsIcon sx={{ color: 'white' }} />
			</IconButton>
			<BootstrapDialog
				open={open}
				onClose={handleClose}
				fullWidth
				maxWidth="md"
				aria-labelledby="options-modal-title"
				aria-describedby="options-modal-description"
			>
				<BootstrapDialogTitle id="options-modal-title" onClose={handleClose}>
					Settings
				</BootstrapDialogTitle>
				<DialogContent>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
							<Tab label="Settings" {...a11yProps(0)} />
							<Tab label="About" {...a11yProps(1)} />
						</Tabs>
					</Box>
					<CustomTabPanel value={value} index={0}>
						<Grid container spacing={2} my={2}>
							<Grid item xs={6} sm={4}>
								<Typography variant="h6" component="h2">Dark Mode</Typography>
							</Grid>
							<Grid item xs={6} sm={8}>
								<Switch
									checked={colourToBoolean(mode)}
									onClick={colorMode.toggleColorMode}
									inputProps={{ 'aria-label': 'Dark mode toggle' }}
								/>
							</Grid>
						</Grid>
					</CustomTabPanel>
					<CustomTabPanel value={value} index={1}>
						<Box textAlign="center">
							<WhatsThisLogo />
							<Typography variant="h1" my={2}>What's This?</Typography>
							<Typography my={2}>
								Developed by <Link style={{ fontWeight: 'bold' }} href="https://soupbowl.io">soup-bowl</Link> and hosted
								on <Link style={{ fontWeight: 'bold' }} href="https://pages.cloudflare.com/">Cloudflare Pages</Link>.
							</Typography>
							<Stack my={2}>
								<Typography>App Version: <Box component="span" fontWeight='700'>{__APP_VERSION__}</Box></Typography>
								<Typography>Library Version: <Box component="span" fontWeight='700'>{__LIB_VERSION__.replace("^", "")}</Box></Typography>
								<Typography>API Version: <Box component="span" fontWeight='700'>{apiVersion}</Box></Typography>
							</Stack>
							<Stack my={2} spacing={2} direction="row" justifyContent="center">
								<Button
									onClick={() => (window.location.reload())}
									variant="contained"
									color="error"
									startIcon={<CachedIcon />}
								>
									Reload
								</Button>
								<Button
									href="https://github.com/soup-bowl/whatsth.is"
									variant="contained"
									startIcon={<GitHubIcon />}
								>
									Source Code
								</Button>
							</Stack>
						</Box>
					</CustomTabPanel>
				</DialogContent>
			</BootstrapDialog>
		</>
	);
}

export default SettingsModel;