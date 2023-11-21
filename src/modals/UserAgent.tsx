import { Button, DialogContent, Grid, Typography } from "@mui/material";
import { getUserAgent } from "libwhatsthis";
import { useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./_shared";

const UserAgentModel = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const userAgent = getUserAgent(window.navigator.userAgent);

	return (
		<div>
			<Button onClick={handleOpen} variant="outlined">Connection Info</Button>
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
					<Grid container id="conn-modal-modal-description" spacing={2} my={2}>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Your UserAgent</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{window.navigator.userAgent}</Typography>
						</Grid>
						<Grid item xs={12} sm={12}>
							<Typography>
								From this, it can be determined:
							</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Browser</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{userAgent.browser.name} {userAgent.browser.version}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Engine</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{userAgent.engine.name} {userAgent.engine.version}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Operating System</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{userAgent.system.name} {userAgent.system.version}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Device</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{userAgent.device ?? <em>Unspecified</em>}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>CPU</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{userAgent.cpu ?? <em>Unspecified</em>}</Typography>
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</div>
	);
}

export default UserAgentModel;
