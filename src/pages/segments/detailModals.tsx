import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 500,
	width: '90%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: '10px',
	p: 4,
};

export function MyIpAddressModal() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [ip4, setIP4] = useState('N/A');
	const [ip6, setIP6] = useState('N/A');

	useEffect(() => {
		axios.get("https://4.ident.me/")
		.then(response => {
			setIP4(response.data);
		})
		axios.get("https://6.ident.me/")
		.then(response => {
			setIP6(response.data);
		})
	}, []);

	return(
		<div>
			<Button onClick={handleOpen} variant="outlined">More Information</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h4" component="h2">
						My IP Addresses
					</Typography>
					<Grid container id="modal-modal-description" spacing={2} my={2}>
						<Grid item xs={12} sm={2}>
							<Typography fontWeight={700}>IP v4</Typography>
						</Grid>
						<Grid item xs={12} sm={10}>
							<Typography>{ip4}</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2} my={2}>
						<Grid item xs={12} sm={2}>
							<Typography fontWeight={700}>IP v6</Typography>
						</Grid>
						<Grid item xs={12} sm={10}>
							<Typography>{ip6}</Typography>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</div>
	);
}
