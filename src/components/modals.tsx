import {
	Typography, Button, Grid, Link, IconButton, Stack, styled,
	Dialog, DialogTitle, DialogContent
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import countryCodeEmoji from "country-code-emoji";
import { useEffect, useState } from "react";
import UAParser from "ua-parser-js";
import { IIPCollection, IIPGeolocation, PageProps } from "../interfaces";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
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
			) : null}
		</DialogTitle>
	);
}

export function UserAgentModel() {
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
					<Typography color="darkgrey">
						With thanks to <Link href="https://github.com/faisalman/ua-parser-js" style={{ color: 'darkgrey', textDecorationColor: 'darkgrey' }}>ua-parser-js</Link> to be
						able to unpack this string of text.
					</Typography>
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

export function MyIpAddressModal({ online }: PageProps) {
	const [ips, setIPs] = useState<IIPCollection>({ ipv4: 'N/A', ipv6: 'N/A' });
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

	return (
		<div>
			<Button onClick={handleOpen} variant="outlined" disabled={!online}>My IP</Button>
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
					<Typography color="darkgrey">
						Information obtained from&nbsp;
						<Link href="https://api.ident.me/" style={{ color: 'darkgrey', textDecorationColor: 'darkgrey' }}>ident.me</Link>
						.
					</Typography>
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

export function IPAddressGeo({ ip}: GeoProps) {
	const [geo, setGeo] = useState<any>();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		axios.get(`https://ipinfo.io/${ip}/json`)
			.then(value => {
				let reply: IIPGeolocation = value.data;
				reply.icon = countryCodeEmoji(reply.country) ?? undefined;
				setGeo(reply);
			})
			.catch(err => {
				setGeo(undefined);
			});
	}, [ip, open]);

	if (geo === undefined) {
		<IconButton size="small">🌐</IconButton>
	}

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
						<>
							<Typography color="darkgrey">
								Information obtained from&nbsp;
								<Link href="https://ipinfo.io/" style={{ color: 'darkgrey', textDecorationColor: 'darkgrey' }}>ipinfo.io</Link>
								.
							</Typography>
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
						</>
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
