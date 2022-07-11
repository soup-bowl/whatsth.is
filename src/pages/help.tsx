import { Typography, Link, Box, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../api/agent";

import GitHubIcon from '@mui/icons-material/GitHub';
import CachedIcon from '@mui/icons-material/Cached';
import WhatsThisLogo from "./segments/logo";

export function HelpPage() {
	const siteTitle = "Help";

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	return(
	<>
		<Typography variant="h3" component="h1" my={2}>What's "What's This?"?</Typography>
		<Typography my={2}>
			What's This is a <Link href="https://labs.soupbowl.io">Soupbowl Labs</Link> experiment to create
			a <Link href="https://web.dev/progressive-web-apps/">Progressive Web App</Link> programmer/tinkerer's toolbox.
			Features added are things that I've needed here and there during my IT career.
		</Typography>
		<Typography variant="h4" component="h2" my={2}>Installing the PWA</Typography>
		<Typography my={2}>
			Installing is an <Box component="span" fontWeight='700'>optional feature</Box>, that enables some functionality to run
			offline. Some operating systems will also integrate the web app in a way that it will appear on the device as a genuine
			app!
		</Typography>
		<Typography variant="h5" component="h3" my={2}>iPhone / iPad</Typography>
		<Typography my={2}>
			Open this website in Safari, and click on the share icon (square with an arrow pointing up). Click on the option
			'Add to Home Screen', and then click 'Add'. The web app will now be installed, and can be uninstalled via regular
			means.
		</Typography>
		<Typography variant="h5" component="h3" my={2}>Android</Typography>
		<Typography my={2}>
			This can be different depending on device and browser. Following instructions are for&nbsp;
			<Box component="span" fontWeight='700'>Chrome</Box>, but PWA can be installed via all mainstream Android web browsers
			such as Firefox & Brave. 
		</Typography>
		<Typography my={2}>
			Open this website in Chrome. Click on the hamburger/dots menu, and click 'Add to Home Screen', and then click 'Add'.
			Most Android variants will highlight PWAs with the icon of the browser technology they run in. 
		</Typography>
	</>
	);
}

interface storage {
	quota: number;
	usage: number;
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

export function AboutPage() {
	const siteTitle = "About";

	const [apiVersion, setApiVersion] = useState('');
	const [storageInfo, setStorageInfo] = useState<storage>({quota: 0, usage: 0});

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	useEffect(() => {
		agent.Details.stats().then(response => {
			// @ts-ignore
			setApiVersion(response.api_version);
		})
		.catch((err: any) => {
			setApiVersion('Comm error');
		});

		if ('storage' in navigator && 'estimate' in navigator.storage) {
			navigator.storage.estimate().then(({usage, quota}) => {
				setStorageInfo({ usage: usage ?? 0, quota: quota ?? 0 });
			});
		}
	}, []);

	return(
		<Box textAlign="center">
			<WhatsThisLogo />
			<Typography variant="h3" component="h1" my={2}>What's This?</Typography>
			<Typography my={2}>
				Developed by <Link style={{fontWeight: 'bold'}} href="https://soupbowl.io">soup-bowl</Link> and hosted
				on <Link style={{fontWeight: 'bold'}} href="https://pages.github.com/">GitHub Pages</Link>.
			</Typography>
			<Stack my={2}>
				<Typography>App version: <Box component="span" fontWeight='700'>{process.env.REACT_APP_VERSION}</Box></Typography>
				<Typography>API version: <Box component="span" fontWeight='700'>{apiVersion}</Box></Typography>
				{ storageInfo.quota !== 0 ?
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
