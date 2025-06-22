import { Button, DialogContent, GridLegacy, Typography } from "@mui/material"
import { getUserAgent } from "../lib"
import { useState } from "react"
import { BootstrapDialog, BootstrapDialogTitle } from "./_shared"
import { SaveScratchButton } from "../components"

const UserAgentModel = () => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const userAgent = getUserAgent(window.navigator.userAgent)

	return (
		<div>
			<Button onClick={handleOpen} variant="contained" color="secondary">
				Connection Info
			</Button>
			<BootstrapDialog
				open={open}
				onClose={handleClose}
				aria-labelledby="conn-modal-modal-title"
				aria-describedby="conn-modal-modal-description"
			>
				<BootstrapDialogTitle id="conn-modal-modal-title" onClose={handleClose}>
					UserAgent Information
				</BootstrapDialogTitle>
				<DialogContent>
					<GridLegacy container id="conn-modal-modal-description" spacing={2} my={2}>
						<GridLegacy item xs={12} sm={4}>
							<Typography fontWeight={700}>Your UserAgent</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={8}>
							<Typography>{window.navigator.userAgent}</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={12}>
							<Typography>From this, it can be determined:</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={4}>
							<Typography fontWeight={700}>Browser</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={8}>
							<Typography>
								{userAgent.browser.name} {userAgent.browser.version}
							</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={4}>
							<Typography fontWeight={700}>Engine</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={8}>
							<Typography>
								{userAgent.engine.name} {userAgent.engine.version}
							</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={4}>
							<Typography fontWeight={700}>Operating System</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={8}>
							<Typography>
								{userAgent.system.name} {userAgent.system.version}
							</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={4}>
							<Typography fontWeight={700}>Device</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={8}>
							<Typography>{userAgent.device ?? <em>Unspecified</em>}</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={4}>
							<Typography fontWeight={700}>CPU</Typography>
						</GridLegacy>
						<GridLegacy item xs={12} sm={8}>
							<Typography>{userAgent.cpu ?? <em>Unspecified</em>}</Typography>
						</GridLegacy>
					</GridLegacy>
					<SaveScratchButton title="UserAgent" message={JSON.stringify(userAgent, null, 2)} />
				</DialogContent>
			</BootstrapDialog>
		</div>
	)
}

export default UserAgentModel
