import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { IScratchpadItem } from "../interfaces";
import { addScratch, createItem, getScratches, saveScratches } from "../utils/scratch";
import { useState } from "react";

const SaveScratchButton = ({ title, message }: { title: string, message: string }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		saveScratches(addScratch(getScratches() ?? [], createItem(title, message)));
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	return (
		<>
			<Button variant="contained" color="secondary" onClick={handleOpen}>
				Save to Scratchpad
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="scratchsave-dialog-title"
				aria-describedby="scratchsave-dialog-description"
			>
				<DialogTitle id="scratchsave-dialog-title">
					Scratch Saved
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="scratchsave-dialog-description">
						Details saved to scratchpad.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>OK</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SaveScratchButton;
