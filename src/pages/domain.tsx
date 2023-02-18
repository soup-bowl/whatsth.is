import {
	Alert, AlertTitle, Box, Button, FormControl, Grid, InputLabel, Link, MenuItem,
	Select, SelectChangeEvent, Skeleton, Stack, TextField, Typography
} from "@mui/material"
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import agent from '../api/agent';
import { ILookupTable, ILookupTableLayout, PageProps } from "../interfaces";
import { MyIpAddressModal } from "../components/modals";
import '../theme/grid.css';

const siteTitle = "Domain Tools";

export default function DomainToolsHome({ online }: PageProps) {
	const [selectionProtocol, setSelectionProtocol] = useState('');
	const [selectionURL, setSelectionURL] = useState('');
	const [currentProtocol, setCurrentProtocol] = useState('');
	const [currentURL, setCurrentURL] = useState('');

	const [loading, setLoading] = useState<boolean>(true);
	const [tableData, setTableData] = useState<ILookupTable>({ columns: [], rows: [] } as ILookupTable);
	const [errResult, setErrResult] = useState<boolean>(false);

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

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

			let cols: GridColumns = [
				{
					field: 'key', headerName: 'Key', flex: 1, renderCell(params) {
						return (<strong>{params.row.key}</strong>);
					}
				},
				{
					field: 'value', headerName: 'Value', flex: 2, renderCell(params) {
						if (params.row.value !== null && params.row.value.includes('<!=BREAK=!>')) {
							let values: string[] = params.row.value.split('<!=BREAK=!>');
							return (
								<div style={{ width: '100%' }}>
									{values.map((value, i) => {
										return (<Typography key={i} my={2}>{value}</Typography>);
									})}
								</div>
							);
						} else {
							return (<Typography my={2}>{params.row.value}</Typography>);
						}
					},
				},
			];

			if (currentProtocol !== "WHOIS") {
				agent.DNS.dns(currentURL)
					.then((response) => {
						let records: ILookupTableLayout[] = [];
						let types: string[] = ['A', 'AAAA', 'CNAME', 'TXT', 'NS'];

						types.forEach((type: string, i: number) => {
							// @ts-ignore
							let key: keyof typeof response.records = type;
							if (response.records[key].length > 0) {
								records.push({
									id: i,
									key: type,
									value: response.records[key].join('<!=BREAK=!>')
								});
							}
						});

						setTableData({
							columns: cols,
							rows: records,
						});
						setLoading(false);
					})
					.catch((err: any) => {
						setErrResult(true);
						setLoading(false);
					});
			} else {
				agent.DNS.whois(currentURL)
					.then(response => {
						let records: ILookupTableLayout[] = [];

						records.push(
							{ id: 0, key: 'Domain', value: response.domain },
							{ id: 1, key: 'Registrar', value: response.registrar },
							{ id: 2, key: 'WHOIS', value: response.whois_operator },
							{ id: 3, key: 'First Registered', value: new Date(response.date_created).toLocaleDateString() },
							{ id: 4, key: 'Renewal Date', value: new Date(response.date_updated).toLocaleDateString() },
							{ id: 5, key: 'Expiry Date', value: new Date(response.date_expires).toLocaleDateString() },
						);

						setTableData({
							columns: cols,
							rows: records,
						});
						setLoading(false);
					})
					.catch((err: any) => {
						setErrResult(true);
						setLoading(false);
					});
			}
		}
	}, [currentProtocol, currentURL]);

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		window.location.href = `/#/domain/${selectionProtocol}/${selectionURL}`;
		setCurrentProtocol(selectionProtocol);
		setCurrentURL(selectionURL);
	};

	const clearForm = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		window.location.href = `/#/domain`;
		setSelectionProtocol('');
		setCurrentProtocol('');
		setSelectionURL('');
		setCurrentURL('');
		setTableData({ columns: [], rows: [] } as ILookupTable);
	};

	return (
		<>
			<Typography variant="h1" my={2}>{siteTitle}</Typography>
			<Typography>Allows you to check the records associated with a domain or subdomain.</Typography>
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
									onChange={(e: SelectChangeEvent) => (setSelectionProtocol(e.target.value))}
								>
									<MenuItem key="DNS" value="DNS">DNS Records</MenuItem>
									<MenuItem key="WHOIS" value="WHOIS">WHOIS Query</MenuItem>
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
								onChange={(e: any) => (setSelectionURL(e.target.value))}
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
						{tableData.rows.length > 0 ?
							<Box>
								<Typography my={2} component="h2" variant="h5">{currentProtocol} records for {currentURL}</Typography>
								<Box>
									{currentProtocol === "DNS" ?
										<Typography my={2}>
											Powered by <Link href="https://www.dnspython.org/">dnspython</Link>.
										</Typography>
										: null}
									{currentProtocol === "WHOIS" ?
										<Typography my={2}>
											Due to the prevalence of <Link href="https://en.wikipedia.org/wiki/Domain_privacy">WHOIS protection</Link>,
											this tool does not show ownership contact information. Powered by
											the <Link href="https://pypi.org/project/python-whois/">Python WHOIS library</Link>.
										</Typography>
										: null}
									<DataGrid
										rows={tableData.rows}
										columns={tableData.columns}
										getRowId={(row) => row.id}
										loading={loading}
										error={errResult}
										getRowHeight={() => 'auto'}
										disableSelectionOnClick
										disableColumnMenu
										disableColumnSelector
										hideFooter
										autoHeight
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
