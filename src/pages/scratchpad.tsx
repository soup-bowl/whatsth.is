import { Typography } from "@mui/material";
import { useEffect } from "react";

const siteTitle = "Scratchpad";

const ScratchpadPage = () => {
	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	return (
		<>
			<Typography variant="h1" my={2}>{siteTitle}</Typography>
			<Typography>
				Store useful notes and links. <strong>This is not currently backed up</strong>, please use at your own risk.
			</Typography>
		</>
	);
}

export default ScratchpadPage;
