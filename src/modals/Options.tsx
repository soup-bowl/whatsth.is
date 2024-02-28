import { DialogContent, Grid, IconButton, Switch, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { BootstrapDialog, BootstrapDialogTitle } from "./_shared";

import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
	mode: any;
	setMode: any;
}

const SettingsModel = ({ mode, setMode }: Props) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode: string) => {
				const cmode = (prevMode === 'light') ? 'dark' : 'light';
				localStorage.setItem('ColourPref', cmode);
				return cmode;
			});
		},
	}), []);

	const colourToBoolean = (input: string): boolean => ((input === 'light') ? false : true);

	return (
		<>
			<IconButton onClick={handleOpen}>
				<SettingsIcon sx={{ color: 'white' }} />
			</IconButton>
			<BootstrapDialog
				open={open}
				onClose={handleClose}
				fullWidth
				maxWidth="md"
				aria-labelledby="options-modal-title"
				aria-describedby="options-modal-description"
			>
				<BootstrapDialogTitle id="options-modal-title" onClose={handleClose}>
					Settings
				</BootstrapDialogTitle>
				<DialogContent>
					<Grid container spacing={2} my={2}>
						<Grid item xs={6} sm={4}>
							<Typography variant="h6" component="h2">Dark Mode</Typography>
						</Grid>
						<Grid item xs={6} sm={8}>
							<Switch
								checked={colourToBoolean(mode)}
								onClick={colorMode.toggleColorMode}
								inputProps={{ 'aria-label': 'Dark mode toggle' }}
							/>
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</>
	);
}

export default SettingsModel;