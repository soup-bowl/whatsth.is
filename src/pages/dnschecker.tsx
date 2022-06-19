import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function DnsCheckHome() {
	const [inputURL, setInputURL] = useState('');
	const navigate = useNavigate();
	const [connectionState, setConnectionState] = useState(true);
	const [recordType, setRecordType] = useState('');
	const MINUTE_MS = 15000;

	// https://stackoverflow.com/a/65049865
	useEffect(() => {
		const interval = setInterval(() => {
			if (navigator.onLine) {
				setConnectionState(true);
			} else {
				setConnectionState(false);
			}
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, []);

	const submitForm = (e:any) => {
		e.preventDefault();
		return navigate(`/dns/${recordType}/${inputURL}`);
	};

	return(
		<>
			<Typography variant="h3" component="h1" my={2}>DNS Inspector</Typography>
			<form onSubmit={submitForm} noValidate>
				<Grid container direction="column" spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<FormControl fullWidth>
								<InputLabel id="type">Record Type</InputLabel>
								<Select
									id="type"
									label="Record Type"
									value={recordType}
									onChange={(e:SelectChangeEvent) => (setRecordType(e.target.value))}
								>
									<MenuItem value={""}>Select...</MenuItem>
									<MenuItem value={"A"}>A</MenuItem>
									<MenuItem value={"AAAA"}>AAAA</MenuItem>
									<MenuItem value={"CNAME"}>CNAME</MenuItem>
									<MenuItem value={"MX"}>MX</MenuItem>
									<MenuItem value={"NS"}>NS</MenuItem>
									<MenuItem value={"TXT"}>TXT</MenuItem>
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
								disabled={!connectionState}
							/>
						</Grid>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
							value="Submit"
							disabled={!connectionState}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	)
}

export function DnsCheckResult() {
	return(<p>BBBBBBBBBBBBB</p>)
}
