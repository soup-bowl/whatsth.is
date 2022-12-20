import { Typography, Link, Box, Button, Stack, Chip, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../api/agent";

import GitHubIcon from '@mui/icons-material/GitHub';
import CachedIcon from '@mui/icons-material/Cached';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import WhatsThisLogo from "../components/logo";
import { IStorage, PageProps } from "../interfaces";

export function HelpPage() {
	const siteTitle = "Help";

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	return(
	<>
		<Typography variant="h1" my={2}>What's "What's This?"?</Typography>
		<Typography my={2}>
			What's This is a <Link href="https://labs.soupbowl.io">Soupbowl Labs</Link> experiment to create
			a <Link href="https://web.dev/progressive-web-apps/">Progressive Web App</Link> programmer/tinkerer's toolbox.
			Features added are things that have been helpful in the IT sector.
		</Typography>
		<Typography variant="h2" my={2}>Progressive Web Application</Typography>
		<Typography my={2}>
			<Link href="https://web.dev/progressive-web-apps/">Progressive Web Apps</Link> (PWA) is an emerging technology to
			provide a way of distributing apps in an easier and quicker way. PWA functions essentially like a website, but
			instead of each request checking and reloading resources, the PWA operates with the resources it has obtained. This
			means <strong>you can go offline</strong>, and the app will continue to work.
		</Typography>
		<Typography variant="h3" my={2}>Installing the PWA</Typography>
		<Typography my={2}>
			Installing is an <strong>optional feature</strong>, as by simplying <em>visiting</em> the site will initiate the PWA.
			However, some browsers and operating systems will integrate the 'app' into the system (works better on mobile than on
			desktop).
		</Typography>
		<Typography my={2}>
			Below are some common devices, but there is&nbsp;
			<Link href="https://github.com/soup-bowl/whatsth.is/wiki/Supported-Devices">
				also a page on the wiki about more supported devices
			</Link>.
		</Typography>
		<Typography variant="h4" my={2}>iPhone / iPad</Typography>
		<Typography my={2}>
			Open this website in Safari, and click on the share icon (square with an arrow pointing up). Click on the option
			'Add to Home Screen', and then click 'Add'. The web app will now be installed, and can be uninstalled via regular
			means.
		</Typography>
		<Typography variant="h4" my={2}>Android</Typography>
		<Typography my={2}>
			This can be different depending on device and browser. Following instructions are for <strong>Chrome</strong>, 
			but PWA can be installed via all mainstream Android web browsers such as Firefox & Brave. 
		</Typography>
		<Typography my={2}>
			Open this website in Chrome. Click on the hamburger/dots menu, and click 'Add to Home Screen', and then click 'Add'.
			Most Android variants will highlight PWAs with the icon of the browser technology they run in. 
		</Typography>
		<Typography variant="h2" my={2}>What does <Chip label="Beta" color="info" /> mean?</Typography>
		<Typography my={2}>
			This represents a segment that has not yet been fully completed. All segments will continue to be worked on for as
			long as they can have stuff added or fixed, but the marked ones require more attention. Expect bugs when dealing 
			with beta-marked entries, but
			please <Link href="https://github.com/soup-bowl/whatsth.is/issues">report them where possible</Link>.
		</Typography>
	</>
	);
}

// https://stackoverflow.com/a/35696506
function formatBytes(bytes: number, decimals: number = 2) {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function AboutPage({online}:PageProps) {
	const siteTitle = "About";

	const [apiVersion, setApiVersion] = useState<string|JSX.Element>('');
	const [storageInfo, setStorageInfo] = useState<IStorage>({} as IStorage);

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	useEffect(() => {
		if (online) {
			agent.Details.openapi().then(response => {
				setApiVersion(response.info.version);
			})
			.catch((err: any) => {
				setApiVersion(
					<Tooltip title={`(${err.code ?? 'N/A'}) ${err.message ?? 'N/A'}`}><span>Comms Error</span></Tooltip>
				);
			});
		} else {
			setApiVersion(<><CloudOffIcon fontSize="inherit" /> Offline</>);
		}
	}, [online]);

	useEffect(() => {
		if ('storage' in navigator && 'estimate' in navigator.storage) {
			navigator.storage.estimate().then(({usage, quota}) => {
				setStorageInfo({ usage: usage ?? 0, quota: quota ?? 0 });
			});
		}
	}, []);

	return(
		<Box textAlign="center">
			<WhatsThisLogo />
			<Typography variant="h1" my={2}>What's This?</Typography>
			<Typography my={2}>
				Developed by <Link style={{fontWeight: 'bold'}} href="https://soupbowl.io">soup-bowl</Link> and hosted
				on <Link style={{fontWeight: 'bold'}} href="https://pages.github.com/">GitHub Pages</Link>.
			</Typography>
			<Stack my={2}>
				<Typography>App Version: <Box component="span" fontWeight='700'>{process.env.REACT_APP_VERSION}</Box></Typography>
				
				<Typography>API Version: <Box component="span" fontWeight='700'>{apiVersion}</Box></Typography>

				{ storageInfo.quota !== undefined && storageInfo.quota !== 0 ?
					<Typography>
						Using <Box component="span" fontWeight='700'>{formatBytes(storageInfo.usage)}</Box> of&nbsp;
						<Box component="span" fontWeight='700'>{formatBytes(storageInfo.quota)}</Box> available local storage.
					</Typography>
				:
					<Typography color="darkgrey">Storage API is not supported.</Typography>
				}
			</Stack>
			<Stack my={2} spacing={2} direction="row" justifyContent="center">
				<Button onClick={() => (window.location.reload())} variant="outlined" color="error"><CachedIcon />&nbsp;Reload</Button>
				<Button href="https://github.com/soup-bowl/whatsth.is" variant="outlined"><GitHubIcon />&nbsp;Source Code</Button>
			</Stack>
		</Box>
	);
}
