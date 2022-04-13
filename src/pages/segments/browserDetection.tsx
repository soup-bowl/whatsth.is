import { Box, Typography } from "@mui/material";
import { UAParser } from 'ua-parser-js';

export default function BrowserDetection() {
	const uaParser = new UAParser();
	uaParser.setUA(window.navigator.userAgent);

	return (
		<>
			<Typography>
				We've detected that you're using <Box component="span" fontWeight='700'>{uaParser.getBrowser().name} {uaParser.getBrowser().version}</Box>
				&nbsp;running on <Box component="span" fontWeight='700'>{uaParser.getOS().name}</Box>.
			</Typography>
			<Typography color="darkgrey">Information obtained from <a href="https://wiki.mozilla.org/UserAgent" style={{color: 'darkgrey'}}>your UserAgent string</a>.</Typography>
		</>
	);
}
