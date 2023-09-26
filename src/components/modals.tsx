import {
	Typography, Button, Grid, Link, IconButton, Stack, styled,
	Dialog, DialogTitle, DialogContent
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from "react";
import UAParser from "ua-parser-js";
import { DialogTitleProps, IIPCollection, IIPGeolocation } from "../interfaces";
import { ConnectionContext } from "../context";
import { getCountryFlag } from "libwhatsthis";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose && (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			)}
		</DialogTitle>
	);
}

export const UserAgentModel = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const uaParser = new UAParser();
	uaParser.setUA(window.navigator.userAgent);

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
							<Typography>{uaParser.getBrowser().name} {uaParser.getBrowser().version}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Engine</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{uaParser.getEngine().name} {uaParser.getEngine().version}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Operating System</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{uaParser.getOS().name} {uaParser.getOS().version}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>Device</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{uaParser.getDevice().model ?? <em>Unspecified</em>}</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography fontWeight={700}>CPU</Typography>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Typography>{uaParser.getCPU().architecture ?? <em>Unspecified</em>}</Typography>
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</div>
	);
}

export const MyIpAddressModal = () => {
	const { connectionState } = useContext(ConnectionContext);
	const [ips, setIPs] = useState<IIPCollection>({ ipv4: 'N/A', ipv6: 'N/A' });
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const fetchIPs = async () => {
			try {
				const ipv4Response = await fetch('https://4.ident.me/');
				const ipv4Data = await ipv4Response.text();

				const ipv6Response = await fetch('https://6.ident.me/');
				const ipv6Data = await ipv6Response.text();

				setIPs({ ipv4: ipv4Data, ipv6: ipv6Data });
			} catch (error) {
				console.error('Error fetching IP data:', error);
			}
		};

		fetchIPs();
	}, []);

	return (
		<div>
			<Button onClick={handleOpen} variant="outlined" disabled={!connectionState}>My IP</Button>
			<BootstrapDialog
				open={open}
				onClose={handleClose}
				aria-labelledby="ipi-modal-modal-title"
				aria-describedby="ipi-modal-modal-description"
			>
				<BootstrapDialogTitle id="ipi-modal-modal-title" onClose={handleClose}>
					My IP Addresses
				</BootstrapDialogTitle>
				<DialogContent>
					<Grid container id="ipi-modal-modal-description" spacing={2} my={2}>
						<Grid item xs={12} sm={2}>
							<Typography fontWeight={700}>IP v4</Typography>
						</Grid>
						<Grid item xs={12} sm={10}>
							<Stack direction="row" alignItems="center">
								<Typography>{ips.ipv4}</Typography>
								<IPAddressGeo ip={ips.ipv4} />
							</Stack>
						</Grid>
						<Grid item xs={12} sm={2}>
							<Typography fontWeight={700}>IP v6</Typography>
						</Grid>
						<Grid item xs={12} sm={10}>
							<Stack direction="row" alignItems="center">
								<Typography>{ips.ipv6}</Typography>
								<IPAddressGeo ip={ips.ipv6} />
							</Stack>
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</div>
	);
}

interface GeoProps {
	ip: string;
}

export const IPAddressGeo = ({ ip }: GeoProps) => {
	const [geo, setGeo] = useState<IIPGeolocation | undefined>();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const fetchIPInfo = async () => {
			try {
				const response = await fetch(`https://ipinfo.io/${ip}/json`);
				if (response.ok) {
					const data = await response.json();
					const reply: IIPGeolocation = data;
					reply.icon = getCountryFlag(reply.country) ?? undefined;
					setGeo(reply);
				} else {
					setGeo(undefined);
				}
			} catch (error) {
				console.error('Error fetching IP info:', error);
				setGeo(undefined);
			}
		};

		if (open && ip) {
			fetchIPInfo();
		}
	}, [ip, open]);

	return (
		<div>
			<IconButton onClick={handleOpen} size="small">{geo?.icon ?? <>🌐</>}</IconButton>
			<BootstrapDialog
				open={open}
				onClose={handleClose}
				aria-labelledby="geo-modal-modal-title"
				aria-describedby="geo-modal-modal-description"
			>
				<BootstrapDialogTitle id="geo-modal-modal-title" onClose={handleClose}>
					About IP...
				</BootstrapDialogTitle>
				<DialogContent>
					{geo !== undefined ?
						<Grid container id="geo-modal-modal-description" spacing={2} my={2}>
							<Grid item xs={12} sm={3}>
								<Typography fontWeight={700}>IP</Typography>
							</Grid>
							<Grid item xs={12} sm={9}>
								<Typography>{geo.ip}</Typography>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography fontWeight={700}>Hostname</Typography>
							</Grid>
							<Grid item xs={12} sm={9}>
								<Typography>{geo.hostname}</Typography>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography fontWeight={700}>Organisation</Typography>
							</Grid>
							<Grid item xs={12} sm={9}>
								<Typography>{geo.org}</Typography>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography fontWeight={700}>Location</Typography>
							</Grid>
							<Grid item xs={12} sm={9}>
								<Typography>{geo.city}, {geo.region}</Typography>
							</Grid>
						</Grid>
						:
						<>
							<Typography id="geo-modal-modal-description" my={2}>
								Some browsers and Adblocking mechanisms block <Link href="https://ipinfo.io/">ipinfo.io</Link>, the
								API we use to detect IP geolocation. There's nothing wrong with blocking this info, but as a result,
								we can't show you the information.
							</Typography>
						</>}
				</DialogContent>
			</BootstrapDialog>
		</div>
	);
}
