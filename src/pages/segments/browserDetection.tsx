import { Box, Link, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { UAParser } from 'ua-parser-js';

export function BrowserDetection() {
	const uaParser = new UAParser();
	uaParser.setUA(window.navigator.userAgent);

	return (
		<>
			<Typography>
				We've detected that you're using <Box component="span" fontWeight='700'>{uaParser.getBrowser().name} {uaParser.getBrowser().version}</Box>
				&nbsp;running on <Box component="span" fontWeight='700'>{uaParser.getOS().name}</Box>.
			</Typography>
			<Typography color="darkgrey">
				Information obtained from&nbsp;
				<Link href="https://wiki.mozilla.org/UserAgent" title={window.navigator.userAgent} style={{color: 'darkgrey', textDecorationColor: 'darkgrey'}}>your UserAgent string</Link>
				.
			</Typography>
		</>
	);
}

export function LocationDetection() {
	const [success, setSuccess] = useState<boolean>(false); 
	const [ipaddr, setIPaddr] = useState<string>('');
	const [ispaddr, setISPaddr] = useState<string>('');

	useEffect(() => {
		axios.get("https://ipinfo.io/json")
		.then(response => {
			setIPaddr(response.data.ip);
			setISPaddr(response.data.org);
			setSuccess(true);
		})
		.catch(e => {
			setSuccess(false);
		})
	}, []);

	if (success) {
		return (
			<>
				<Typography>
					We've detected that your IP address is <Box component="span" fontWeight='700'>{ipaddr}</Box> and your ISP is <Box component="span" fontWeight='700'>{ispaddr}</Box>.
				</Typography>
				<Typography color="darkgrey">
					Information obtained from&nbsp;
					<Link href="https://ipinfo.io/" title="Specifically, https://ipinfo.io/json" style={{color: 'darkgrey', textDecorationColor: 'darkgrey'}}>ipinfo.io</Link>
					.
				</Typography>
			</>
		);
	} else {
		return(
			<>
				<Typography>
					We were unable to show you information from the <Link href="https://ipinfo.io/">ipinfo.io</Link> service.
				</Typography>
				<Typography color="darkgrey">
					This can often be blocked by advert & privacy blocking scripts.
				</Typography>
			</>
		);
	}

	
}