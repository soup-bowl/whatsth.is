import { Box, Link, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { UAParser } from 'ua-parser-js';
import { MyIpAddressModal } from "./detailModals";

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

interface LocationProps {
	ConnectionState: boolean;
}

export function LocationDetection({ConnectionState = true}:LocationProps) {
	const [success, setSuccess] = useState<boolean>(false); 
	const [ipaddr, setIPaddr] = useState<string>('');

	useEffect(() => {
		axios.get("https://ident.me/")
		.then(response => {
			setIPaddr(response.data);
			setSuccess(true);
		})
		.catch(e => {
			setSuccess(false);
		})
	}, []);

	if (!ConnectionState) {
		return(<Typography color="darkgrey">Cannot retrieve information - you are currently offline.</Typography>);
	}

	if (success) {
		return (
			<>
				<Typography>
					Your IP address is <Box component="span" fontWeight='700'>{ipaddr}</Box>.
				</Typography>
				<Typography color="darkgrey">
					Information obtained from&nbsp;
					<Link href="https://api.ident.me/" style={{color: 'darkgrey', textDecorationColor: 'darkgrey'}}>ident.me</Link>
					.
				</Typography><MyIpAddressModal />
			</>
		);
	} else {
		return(
			<Typography>
				Unable to reach the <Link href="https://api.ident.me">ident.me</Link> service.
			</Typography>
		);
	}

	
}