import { Alert, AlertTitle, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import agent from '../api/agent';
import { IDNSProtocol, IRecord, PageProps } from "../interfaces";
import { MyIpAddressModal } from "./segments/detailModals";

const siteTitle = "DNS Inspector";

interface dnsTableData {
	rows: IRecord[];
	columns: GridColumns;
}

export default function DnsCheckHome({online}:PageProps) {
	const [selectionProtocol, setSelectionProtocol] = useState('');
	const [selectionURL, setSelectionURL] = useState('');
	const [currentProtocol, setCurrentProtocol] = useState('');
	const [currentURL, setCurrentURL] = useState('');

	const [protocols, setProtocols] = useState<IDNSProtocol[]>([]);

	const [loading, setLoading] = useState<boolean>(true);
	const [dnsData, setDnsData] = useState<dnsTableData>({rows: [], columns: []});
	const [errResult, setErrResult] = useState<any>(undefined);

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	useEffect(() => {
		agent.DNS.protocols()
		.then((response:any) => {
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
			agent.DNS.probe(currentProtocol, currentURL)
			.then((response:any) => {
				let rows:IRecord[]   = [];
				let cols:GridColumns = [];
				if (currentProtocol !== 'TXT') { cols.push( { field: 'address', headerName: 'Address', flex: 1} ) };
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
								{protocols.map((protocol:IDNSProtocol) => (
									<MenuItem key={protocol.type} value={protocol.type}>{protocol.type}</MenuItem>
								))}
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
								/>
							</Box>
						</Box>
						: null}
					</Grid>
				</Grid>
			</form>
		</>
	);
};
