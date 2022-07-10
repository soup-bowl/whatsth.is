import { Box, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';

interface ITime {
	string: Date;
	unix: number;
	overflow: boolean;
}

const siteTitle = "Unix Timestamp Conversion";

export default function UnixEpochPage() {
	const inputGet:string = window.location.hash.slice(7);
	const inputIsNumber:boolean = /^\d+$/.test(inputGet);

	let startingUnix = (inputIsNumber) ? parseInt(inputGet) : Math.floor(Date.now() / 1000);
	const [timeStore, setTimeStore] = useState<ITime>({
		string: new Date(startingUnix * 1000),
		unix: startingUnix,
		overflow: false
	});

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	useEffect(() => {
		window.location.href = `/#/time/${timeStore.unix}`
	}, [timeStore]);

	const changeDateTime = (e:any) => {
		let conversionDate = new Date(e.target.value);
		let unix = Math.floor(conversionDate.getTime() / 1000);
		setTimeStore({
			string: conversionDate,
			unix: unix,
			overflow: (unix > 2147483647) ? true : false
		});
	};

	const changeUnix = (e:any) => {
		let conversionDate = new Date(parseInt(e.target.value) * 1000);
		setTimeStore({
			string: conversionDate,
			unix: e.target.value,
			overflow: (e.target.value > 2147483647) ? true : false
		});
	};

	return(
		<>
			<Typography variant="h3" component="h1" my={2}>{siteTitle}</Typography>
			<Typography my={2}>
				Unix timestamp represents the <Box component="span" fontWeight='700'>seconds past since 1st January 1970</Box>.
				This therefore gives you a way to represent time using a linear scaling integer, as opposed to a complicated
				string/text based comparison.
			</Typography>
			<Box my={2}>
				<TextField fullWidth
					id="humanDTString"
					label="Human Date & Time"
					type="datetime-local"
					InputProps={{ inputProps: { min: '1970-01-01T00:00:00', max: '9999-12-31T23:59:59' } }}
					value={timeStore.string.toISOString().slice(0, -5)}
					onChange={changeDateTime}
				/>
			</Box>
			<Box my={2}>
				<TextField fullWidth
					id="computerDTString"
					label="Unix Epoch String"
					type="number"
					InputProps={{ inputProps: { min: 0, max: 253402300799 } }}
					value={timeStore.unix}
					onChange={changeUnix}
				/>
			</Box>
			{timeStore.overflow ?
				<Typography my={2}>
					<WarningIcon fontSize="inherit" /> Be warned - this date goes over the <Box component="span" fontWeight='700'>signed 32-bit buffer</Box>.
					On legacy systems, a Unix timestamp of this value will be subjected to
					the <Link href="https://en.wikipedia.org/wiki/Year_2038_problem">Year 2038 problem</Link>.
				</Typography>
			: null}
		</>
	);
}
