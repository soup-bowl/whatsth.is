import { Alert, AlertTitle, Box, Typography } from "@mui/material"
import { useEffect } from "react"

const SharePage = () => {
	const siteTitle = "File Sharing"

	useEffect(() => {
		document.title = `${siteTitle} - What's This?`
	})

	return (
		<>
			<Typography variant="h1" my={2}>
				{siteTitle}
			</Typography>
			<Typography>Peer-to-peer filesharing without relying on an interim server.</Typography>
			<Box my={2}>
				<Alert severity="info">
					<AlertTitle>Beta</AlertTitle>
					This is a <strong>beta</strong> service. Please use the feedback forms to let us know what is missing!
				</Alert>
			</Box>
		</>
	)
}

export default SharePage
