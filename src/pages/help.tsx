import { Typography, Link, Box } from "@mui/material";

export default function HelpPage() {
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
