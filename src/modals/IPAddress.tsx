import { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../context";
import { IPAddresses, IPGeolocation, getBothIPAddresses, getIPGeolocation } from "libwhatsthis";
import { Button, DialogContent, Grid, IconButton, Link, Stack, Typography } from "@mui/material";
import { BootstrapDialog, BootstrapDialogTitle } from "./_shared";

export const MyIpAddressModal = () => {
	const { connectionState } = useContext(ConnectionContext);
	const [ips, setIPs] = useState<IPAddresses>({ ipv4: 'N/A', ipv6: 'N/A' });
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const fetchIPs = async () => {
			try {
				setIPs(await getBothIPAddresses());
			} catch (error) {
				console.error('Error fetching IP data:', error);
			}
		};

		fetchIPs();
	}, []);

	return (
		<div>
			<Button onClick={handleOpen} variant="contained" color="secondary" disabled={!connectionState}>My IP</Button>
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
	const [geo, setGeo] = useState<IPGeolocation | undefined>();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const fetchIPInfo = async () => {
			try {
				setGeo(await getIPGeolocation(ip));
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
