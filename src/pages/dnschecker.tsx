import {
	Alert, AlertTitle, Box, Button, FormControl, Grid, InputLabel, Link, ListSubheader, MenuItem,
	Select, SelectChangeEvent, Skeleton, Stack, TextField, Typography
} from "@mui/material"
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import agent from '../api/agent';
import { IDNSProtocols, IDNSTableData, IRecord, PageProps } from "../interfaces";
import { IPAddressGeo, MyIpAddressModal } from "../components/modals";

const siteTitle = "DNS Inspector";

export default function DnsCheckHome({online}:PageProps) {
	const [selectionProtocol, setSelectionProtocol] = useState('');
	const [selectionURL, setSelectionURL] = useState('');
	const [currentProtocol, setCurrentProtocol] = useState('');
	const [currentURL, setCurrentURL] = useState('');

	const [protocols, setProtocols] = useState<IDNSProtocols[]>([]);

	const [loading, setLoading] = useState<boolean>(true);
	const [dnsData, setDnsData] = useState<IDNSTableData>({rows: [], columns: []});
	const [errResult, setErrResult] = useState<any>(undefined);

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	useEffect(() => {
		agent.DNS.protocols()
		.then((response) => {
			setProtocols(response.records);
		});
	}, []);

	useEffect(() => {
		// Split the protocol from the URL. In case someone has copied and pasted a URL, we check to see if there's
		// a protocol splitter (://) then strip it out too. Either way, it'll be last in the split return array.
		// Finally, check if there's subfolder, and remove it. Congrats, clean domain strip!
		const [method, ...urlSegments] = window.location.hash.slice(6).split('/');
		if (method !== '') {
			const urlParts = urlSegments.join('/').split('://');
			const url = urlParts[urlParts.length - 1].split('/')[0];
			setSelectionProtocol(method);
			setCurrentProtocol(method);
			setSelectionURL(url);
			setCurrentURL(url);
		}
	}, []);

	useEffect(() => {
		if (currentProtocol !== '' && currentURL !== '') {
			setLoading(true);
			if (currentProtocol !== "WHOIS") {
				agent.DNS.probe(currentProtocol, currentURL)
				.then((response) => {
					let rows:IRecord[]   = [];
					let cols:GridColumns = [];
					if (currentProtocol !== 'TXT') { cols.push( { field: 'address', headerName: 'Address', flex: 1, renderCell: (params) => {
						return(
							<>
								{params.value}
								{((params.value.match(/\./g)||[]).length === 3) || ((params.value.match(/:/g)||[]).length > 3) ?
									<><IPAddressGeo ip={params.value} /></>
								: null}
							</>
						);
					}} ) };
					if (currentProtocol === 'MX' ) { cols.push( { field: 'priority', headerName: 'Priority', flex: 1, maxWidth: 125} ) };
					if (currentProtocol === 'TXT') { cols.push( { field: 'text', headerName: 'Text', flex: 1 } ) };

					for (let index = 0; index < response.records.length; index++) {
						response.records[index].id = index;
						rows.push( response.records[index] );
					}

					setDnsData({
						rows: rows,
						columns: cols,
					});
					setLoading(false);
				})
				.catch((err:any) => {
					setErrResult(true);
					setLoading(false);
				});
			} else {
				agent.DNS.whois(currentURL)
				.then(response => {
					let cols:GridColumns = [
						{ field: 'key', headerName: 'Key', flex: 1 },
						{ field: 'value', headerName: 'Value', flex: 2 },
					];
					let records:any = [];
					records.push(
						{ id: 0, key: 'Domain', value: response.domain },
						{ id: 1, key: 'Registrar', value: response.registrar },
						{ id: 2, key: 'WHOIS', value: response.whois_operator },
						{ id: 3, key: 'First Registered', value: new Date(response.date_created) },
						{ id: 4, key: 'Renewal Date', value: new Date(response.date_updated) },
						{ id: 5, key: 'Expiry Date', value: new Date(response.date_expires) },
					);

					setDnsData({
						rows: records,
						columns: cols,
					});
					setLoading(false);
				})
				.catch((err:any) => {
					setErrResult(true);
					setLoading(false);
				});
			}
		}
	}, [currentProtocol, currentURL]);

	const submitForm = (e:any) => {
		e.preventDefault();
		window.location.href = `/#/dns/${selectionProtocol}/${selectionURL}`;
		setCurrentProtocol(selectionProtocol);
		setCurrentURL(selectionURL);
	};

	const clearForm = (e:any) => {
		e.preventDefault();
		window.location.href = `/#/dns`;
		setSelectionProtocol('');
		setCurrentProtocol('');
		setSelectionURL('');
		setCurrentURL('');
		setDnsData({rows: [], columns: []});
	};

	return(
		<>
			<Typography variant="h1" my={2}>{siteTitle}</Typography>
			<Typography>Allows you to check the public DNS records associated with a domain or subdomain.</Typography>
			<Box my={2}>
				<Alert severity="info">
					<AlertTitle>Beta</AlertTitle>
					This is a <strong>beta</strong> service. Please use the feedback forms to let us know what is missing!
				</Alert>
			</Box>
			<form onSubmit={submitForm} noValidate>
				<Grid container direction="column" spacing={2} my={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<FormControl fullWidth>
								<InputLabel id="type">Type</InputLabel>
								<Select
									id="type"
									label="Type"
									disabled={!online}
									value={selectionProtocol}
									onChange={(e:SelectChangeEvent) => (setSelectionProtocol(e.target.value))}
								>
									<ListSubheader>Records</ListSubheader>
									{protocols.map((protocol) => (
										<MenuItem key={protocol.type} value={protocol.type}>{protocol.type}</MenuItem>
									))}
									<ListSubheader>Tools</ListSubheader>
									<MenuItem key="WHOIS" value="WHOIS">WHOIS</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={8}>
							<TextField fullWidth
								id="url"
								type="url"
								placeholder="soupbowl.io"
								label="URL"
								variant="outlined"
								value={selectionURL}
								onChange={(e:any) => (setSelectionURL(e.target.value))}
								disabled={!online}
							/>
						</Grid>
					</Grid>
					<Grid item>
						<Stack spacing={2} direction="row">
							<Button
								type="submit"
								variant="contained"
								value="Submit"
								disabled={!online}
							>
								Submit
							</Button>
							<Button
								variant="outlined"
								value="Return"
								onClick={clearForm}
								disabled={(currentProtocol === '')}
							>
								Clear Selection
							</Button>
							<MyIpAddressModal online={online} />
						</Stack>
					</Grid>
					<Grid item>
						{dnsData.rows.length > 0 ?
						<Box>
							<Typography my={2} component="h2" variant="h5">{currentProtocol} records for {currentURL}</Typography>
							<Box my={2} height={400}>
								{currentProtocol === "WHOIS" ?
								<Typography  my={2}>
									Due to the prevalence of <Link href="https://en.wikipedia.org/wiki/Domain_privacy">WHOIS protection</Link>,
									this tool does not show ownership contact information. Powered by
									the <Link href="https://pypi.org/project/python-whois/">Python WHOIS library</Link>.
								</Typography>
								: null}
								<DataGrid
									rows={dnsData.rows}
									columns={dnsData.columns}
									getRowId={(row) => row.id}
									loading={loading}
									error={errResult}
									disableSelectionOnClick
									disableColumnMenu
									disableColumnSelector
									hideFooter
									sx={{ marginBottom: 2 }}
								/>
							</Box>
						</Box>
						:
						<Box>
							{currentURL !== '' ?
							<>
								{loading ?
								<>
									<Typography my={2} component="h2" variant="h5"><Skeleton /></Typography>
									<Skeleton variant="rectangular" width="100%" height={400} />
								</>
								: 
								<Typography my={2}>
									There are no <strong>{currentProtocol}</strong> records to display for <strong>{currentURL}</strong>.
								</Typography>}
							</>
							: null}
						</Box>}
					</Grid>
				</Grid>
			</form>
		</>
	);
};
