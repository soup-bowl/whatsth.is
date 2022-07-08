import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from '../api/agent';
import { IDNSProtocol, IRecord, PageProps } from "../interfaces";
import { LocationDetection } from "./segments/browserDetection";

export function DnsCheckHome({online}:PageProps) {
	const [inputURL, setInputURL] = useState('');
	const navigate = useNavigate();
	const [recordType, setRecordType] = useState('');
	const [protocols, setProtocols] = useState<IDNSProtocol[]>([]);

	useEffect(() => {
		agent.DNS.protocols()
		.then((response:any) => {
			setProtocols(response.records);
		});
	}, []);

	const submitForm = (e:any) => {
		e.preventDefault();
		return navigate(`/dns/${recordType}/${inputURL}`);
	};

	return(
		<>
			<Typography variant="h3" component="h1" my={2}>DNS Inspector</Typography>
			<Typography>Allows you to check the public DNS records associated with a domain or subdomain.</Typography>
			<form onSubmit={submitForm} noValidate>
				<Grid container direction="column" spacing={2} my={2}>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControl fullWidth>
								<InputLabel id="type">Type</InputLabel>
								<Select
									id="type"
									label="Type"
									disabled={!online}
									value={recordType}
									onChange={(e:SelectChangeEvent) => (setRecordType(e.target.value))}
								>
								{protocols.map((protocol:IDNSProtocol) => (
									<MenuItem key={protocol.type} value={protocol.type}>{protocol.type}</MenuItem>
								))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={8}>
							<TextField fullWidth
								id="url"
								type="url"
								placeholder="soupbowl.io"
								label="URL"
								variant="outlined"
								value={inputURL}
								onChange={(e:any) => (setInputURL(e.target.value))}
								disabled={!online}
							/>
						</Grid>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
							value="Submit"
							disabled={!online}
						>
							Submit
						</Button>
					</Grid>
					<Grid item>
						<LocationDetection ConnectionState={online} />
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export function DnsCheckResult() {
	const navigate = useNavigate();

	const [protocol, setProtocol] = useState<string>('');
	const [dnsUrl, setDnsUrl]     = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [columns, setColumns] = useState<any>([]);
	const [rows, setRows] = useState<any>([]);
	const [errResult, setErrResult] = useState<any>(undefined);

	useEffect(() => {
		// Split the protocol from the URL. In case someone has copied and pasted a URL, we check to see if there's
		// a protocol splitter (://) then strip it out too. Either way, it'll be last in the split return array.
		// Finally, check if there's subfolder, and remove it. Congrats, clean domain strip!
		const [method, ...urlSegments] = window.location.hash.slice(6).split('/');
		const urlParts = urlSegments.join('/').split('://');
		const url = urlParts[urlParts.length - 1].split('/')[0];
		setProtocol(method);
		setDnsUrl(url);
	}, []);

	useEffect(() => {
		if (protocol !== '' && dnsUrl !== '') {
			agent.DNS.probe(protocol, dnsUrl)
			.then((response:any) => {
				let rows:IRecord[]   = [];
				let cols:GridColumns = [];
				if (protocol !== 'TXT') { cols.push( { field: 'address', headerName: 'Address', flex: 1} ) };
				if (protocol === 'MX' ) { cols.push( { field: 'priority', headerName: 'Priority', flex: 1, maxWidth: 125} ) };
				if (protocol === 'TXT') { cols.push( { field: 'text', headerName: 'Text', flex: 1 } ) };

				for (let index = 0; index < response.records.length; index++) {
					response.records[index].id = index;
					rows.push( response.records[index] );
				}

				setColumns(cols);
				setRows(rows);
				setLoading(false);
			})
			.catch((err:any) => {
				setErrResult(true);
				setLoading(false);
			});
		}
	}, [protocol, dnsUrl]);

	return(
		<Box>
			<Typography my={2} component="h1" variant="h4">{protocol} records for {dnsUrl}</Typography>
			<Box my={2} height={400}>
				<DataGrid
					rows={rows}
					columns={columns}
					getRowId={(row) => row.id}
					loading={loading}
					error={errResult}
					disableSelectionOnClick
					disableColumnMenu
					disableColumnSelector
					hideFooter
				/>
			</Box>
			<Box>
				<Button variant="contained" value="Return" onClick={() => navigate('/dns')}>Check Another Site</Button>
			</Box>
		</Box>
	);
};
