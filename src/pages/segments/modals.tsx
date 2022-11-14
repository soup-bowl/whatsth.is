import { Modal, Box, Typography, Button, Grid, Link } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import UAParser from "ua-parser-js";
import { IIPCollection, PageProps } from "../../interfaces";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxHeight: '90%',
	overflowY: 'auto',
	maxWidth: 500,
	width: '90%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export function UserAgentModel() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const uaParser = new UAParser();
	uaParser.setUA(window.navigator.userAgent);

	return(
		<div>
			<Button onClick={handleOpen} variant="outlined">Connection Info</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h4" component="h2">
						UserAgent Information
					</Typography>
					<Typography  color="darkgrey">
						With thanks to <Link href="https://github.com/faisalman/ua-parser-js" style={{color: 'darkgrey', textDecorationColor: 'darkgrey'}}>ua-parser-js</Link> to be
						able to unpack this string of text.
					</Typography>
					<Grid container id="modal-modal-description" spacing={2} my={2}>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Your UserAgent</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{window.navigator.userAgent}</Typography>
						</Grid>
					</Grid>
					<Typography>
						From this, it can be determined:
					</Typography>
					<Grid container spacing={2} my={2}>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Browser</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{uaParser.getBrowser().name} {uaParser.getBrowser().version}</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2} my={2}>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Engine</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{uaParser.getEngine().name} {uaParser.getEngine().version}</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2} my={2}>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Operating System</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{uaParser.getOS().name} {uaParser.getOS().version}</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2} my={2}>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Device</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{uaParser.getDevice().model ?? <em>Unspecified</em>}</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2} my={2}>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>CPU</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{uaParser.getCPU().architecture ?? <em>Unspecified</em>}</Typography>
						</Grid>
					</Grid>
					<Button variant="contained" onClick={handleClose}>Close</Button>
				</Box>
			</Modal>
		</div>
	);
}

export function MyIpAddressModal({online}:PageProps) {
	const [ips, setIPs] = useState<IIPCollection>({ipv4: 'N/A', ipv6: 'N/A'});
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		axios.get('https://4.ident.me/').then(value => {
			let ipVals = ips;
			ipVals.ipv4 = value.data;
			setIPs(ipVals);
		});
		axios.get('https://6.ident.me/').then(value => {
			let ipVals = ips;
			ipVals.ipv6 = value.data;
			setIPs(ipVals);
		});
	}, [ips]);

	return(
		<div>
			<Button onClick={handleOpen} variant="outlined" disabled={!online}>My IP</Button>
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
					<Typography color="darkgrey" my={2}>
						Information obtained from&nbsp;
						<Link href="https://api.ident.me/" style={{color: 'darkgrey', textDecorationColor: 'darkgrey'}}>ident.me</Link>
						.
					</Typography>
					<Grid container id="modal-modal-description" spacing={2} my={2}>
						<Grid item xs={12} sm={2}>
							<Typography fontWeight={700}>IP v4</Typography>
						</Grid>
						<Grid item xs={12} sm={10}>
							<Typography>{ips.ipv4}</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2} my={2}>
						<Grid item xs={12} sm={2}>
							<Typography fontWeight={700}>IP v6</Typography>
						</Grid>
						<Grid item xs={12} sm={10}>
							<Typography>{ips.ipv6}</Typography>
						</Grid>
					</Grid>
					<Button variant="contained" onClick={handleClose}>Close</Button>
				</Box>
			</Modal>
		</div>
	);
}
