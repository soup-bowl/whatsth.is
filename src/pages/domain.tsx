import {
	Alert, AlertTitle, Box, Button, FormControl, Grid, InputLabel, Link, MenuItem,
	Select, SelectChangeEvent, Skeleton, Stack, TextField, Typography
} from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import agent from '../api/agent';
import { ILookupTable, ILookupTableLayout, IDNSRecordDetails, IDomainSelection, IDNSResult } from "../interfaces";
import { IPAddressGeo, MyIpAddressModal, ReportDNSError } from "../components";
import '../theme/grid.css';
import { ConnectionContext } from "../context";
import { isValidIP } from "../utils/stringUtils";

const DomainToolsHome = () => {
	const siteTitle = "Domain Tools";

	const { connectionState } = useContext(ConnectionContext);
	const [selectionInput, setSelectionInput] = useState<IDomainSelection>({} as IDomainSelection);
	const [currentInput, setCurrentInput] = useState<IDomainSelection>({} as IDomainSelection);

	const [loading, setLoading] = useState<boolean>(true);
	const [tableData, setTableData] = useState<ILookupTable>({ columns: [], rows: [] } as ILookupTable);
	const [errResult, setErrResult] = useState<boolean>(false);

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	useEffect(() => {
		// Split the protocol from the URL. In case someone has copied and pasted a URL, we check to see if there's
		// a protocol splitter (://) then strip it out too. Either way, it'll be last in the split return array.
		// Finally, check if there's subfolder, and remove it. Congrats, clean domain strip!
		const [method, ...urlSegments] = window.location.hash.slice('/#/domain'.length).split('/');
		if (method !== '') {
			const urlParts = urlSegments.join('/').split('://');
			const url = urlParts[urlParts.length - 1].split('/')[0];

			const selectionSetter: IDomainSelection = { protocol: method, url: url };
			setSelectionInput(selectionSetter);
			setCurrentInput(selectionSetter);
		}
	}, []);

	useEffect(() => {
		if (currentInput?.protocol !== undefined && currentInput.protocol !== '' && currentInput?.url !== undefined && currentInput.url !== '') {
			setLoading(true);

			const cols: GridColDef[] = [
				{
					field: 'key', headerName: 'Key', flex: 1, renderCell(params) {
						return (<strong>{params.row.key}</strong>);
					}
				},
				{
					field: 'value', headerName: 'Value', flex: 2, renderCell(params) {
						if (params.row.value !== null && params.row.value.includes('<!=BREAK=!>')) {
							const values: string[] = params.row.value.split('<!=BREAK=!>');
							return (
								<div style={{ width: '100%' }}>
									{values.map((value, i) => {
										return (
											<Stack key={i} my={2} direction="row" alignItems="center">
												<Typography>{value}</Typography>
												{isValidIP(value) &&
													<IPAddressGeo ip={value} />
												}
											</Stack>
										);
									})}
								</div>
							);
						} else {
							return (
								<Stack direction="row" alignItems="center">
									<Typography my={2}>{params.row.value}</Typography>
									{isValidIP(params.row.value) &&
										<IPAddressGeo ip={params.row.value} />
									}
								</Stack>
							);
						}
					},
				},
			];

			if (currentInput.protocol !== "WHOIS") {
				agent.DNS.dns(currentInput.url)
					.then((response) => {
						const records: ILookupTableLayout[] = [];
						const types: (keyof IDNSResult)[] = ['a', 'aaaa', 'cname', 'mx', 'txt', 'ns'];

						types.forEach((type: keyof IDNSResult, i: number) => {
							if (response[type].length > 0) {
								const collection: string[] = [];
								if (type === 'mx') {
									response[type].forEach((entry: IDNSRecordDetails) => {
										collection.push(`${entry.address} (Priority ${entry.priority})`);
									});
								}
								records.push({
									id: i,
									key: type,
									value: (collection.length > 0) ? collection.join('<!=BREAK=!>') : response[type].join('<!=BREAK=!>')
								});
							}
						});

						setTableData({
							columns: cols,
							rows: records,
						});
						setLoading(false);
					})
					.catch(() => {
						setErrResult(true);
						setLoading(false);
					});
			} else {
				agent.DNS.whois(currentInput.url)
					.then(response => {
						const records: ILookupTableLayout[] = [
							{ id: 0, key: 'Domain', value: response.domain },
							{ id: 1, key: 'Registrar', value: response.registrar },
							{ id: 2, key: 'WHOIS', value: response.whois },
							{ id: 3, key: 'First Registered', value: new Date(response.created).toLocaleDateString() },
							{ id: 4, key: 'Renewal Date', value: new Date(response.updated).toLocaleDateString() },
							{ id: 5, key: 'Expiry Date', value: new Date(response.expires).toLocaleDateString() },
						];

						setTableData({
							columns: cols,
							rows: records,
						});
						setLoading(false);
					})
					.catch(() => {
						setErrResult(true);
						setLoading(false);
					});
			}
		}
	}, [currentInput]);

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		window.location.href = `/#/domain/${selectionInput.protocol}/${selectionInput.url}`;
		setCurrentInput({ protocol: selectionInput.protocol, url: selectionInput.url });
	};

	const clearForm = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		window.location.href = `/#/domain`;
		setCurrentInput({} as IDomainSelection);
		setSelectionInput({} as IDomainSelection);
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
									disabled={!connectionState}
									value={selectionInput?.protocol ?? ''}
									onChange={(e: SelectChangeEvent) => setSelectionInput({ ...selectionInput, protocol: e.target.value })}
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
								value={selectionInput?.url ?? ''}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectionInput({ ...selectionInput, url: e.target.value })}
								disabled={!connectionState}
							/>
						</Grid>
					</Grid>
					<Grid item>
						<Stack spacing={2} direction="row">
							<Button
								type="submit"
								variant="contained"
								value="Submit"
								disabled={!connectionState}
							>
								Submit
							</Button>
							<Button
								variant="outlined"
								value="Return"
								onClick={clearForm}
								disabled={(currentInput.protocol === '')}
							>
								Clear Selection
							</Button>
							<MyIpAddressModal />
						</Stack>
					</Grid>
					<Grid item>
						{tableData.rows.length > 0 ?
							<Box>
								<Typography my={2} component="h2" variant="h5">{currentInput.protocol} records for {currentInput.url}</Typography>
								<Box>
									{currentInput.protocol === "DNS" &&
										<Typography my={2}>
											DNS Lookup powered by <Link href="https://dnsclient.michaco.net/">DnsClient.NET</Link>.
										</Typography>
									}
									{currentInput.protocol === "WHOIS" &&
										<Typography my={2}>
											Due to the prevalence of <Link href="https://en.wikipedia.org/wiki/Domain_privacy">WHOIS protection</Link>,
											this tool does not show ownership contact information.
										</Typography>
									}
									<DataGrid
										rows={tableData.rows}
										columns={tableData.columns}
										getRowId={(row) => row.id}
										loading={loading}
										getRowHeight={() => 'auto'}
										disableColumnMenu
										disableColumnSelector
										hideFooter
										autoHeight
										sx={{ minHeight: 400 }}
									/>
								</Box>
								<Box my={2}>
									<ReportDNSError url={currentInput.url} protocol={currentInput.protocol} object={tableData.rows} />
								</Box>
							</Box>
							:
							<Box>
								{currentInput?.url !== undefined && currentInput.url !== '' &&
									<>
										{loading ?
											<>
												<Typography my={2} component="h2" variant="h5"><Skeleton /></Typography>
												<Skeleton variant="rectangular" width="100%" height={400} />
											</>
											:
											<Typography my={2}>
												There are no <strong>{currentInput.protocol}</strong> records to display for <strong>{currentInput.url}</strong>.
											</Typography>}
									</>
								}
							</Box>}
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default DomainToolsHome;
