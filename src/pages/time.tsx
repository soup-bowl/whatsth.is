import { Box, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { ConversionTime, timeOutput, SecondType } from "libwhatsthis";

import WarningIcon from '@mui/icons-material/Warning';
import { SaveScratchButton } from "../components";

const siteTitle = "Unix Timestamp Conversion";
const MaxAcceptUnix = 253402300799999;

const UnixEpochPage = () => {
	const [timeStore, setTimeStore] = useState<ConversionTime>((): ConversionTime => {
		const inputGet: string = window.location.hash.split('/').slice(-1)[0];
		const inputIsNumber: boolean = /^\d+$/.test(inputGet);

		return timeOutput(
			(inputIsNumber) ? parseInt(inputGet) : Math.floor(Date.now() / 1e3)
		);
	});

	useEffect(() => { document.title = `${siteTitle} - What's This?` }, []);

	useEffect(() => {
		window.location.href = `/#/time/${timeStore.unix}`
	}, [timeStore]);

	const changeDateTime = (e: ChangeEvent<HTMLInputElement>) => {
		const conversionDate: Date = new Date(e.target.value);
		const ts: number = ((conversionDate.getTime() / 1e3) >= 1e11) ?
			conversionDate.getTime() : Math.floor((conversionDate.getTime() / 1e3));

		setTimeStore(timeOutput(ts));
	};

	const changeUnix = (e: ChangeEvent<HTMLInputElement>) => {
		setTimeStore(timeOutput(parseInt(e.target.value)));
	};

	return (
		<>
			<Typography variant="h1" my={2}>{siteTitle}</Typography>
			<Typography my={2}>
				Unix timestamp represents the <Box component="span" fontWeight='700'>seconds past since 1st January 1970</Box>.
				This therefore gives you a way to represent time using a linear scaling integer, as opposed to a complicated
				string/text based comparison.
			</Typography>
			<Typography my={2}>
				This tool automatically supports epoch represented as seconds and milliseconds (1/1,000 seconds).
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
					InputProps={{
						inputProps: { min: 0, max: MaxAcceptUnix },
						endAdornment: <InputAdornment position="end">
							{timeStore.type === SecondType.s ?
								<>s</>
								:
								<>ms (1/1,000s)</>
							}
						</InputAdornment>,
					}}
					value={timeStore.unix}
					onChange={changeUnix}
				/>
			</Box>
			{timeStore.overflow &&
				<Typography my={2}>
					<WarningIcon fontSize="inherit" /> Be warned - this date goes over the <Box component="span" fontWeight='700'>signed 32-bit buffer</Box>.
					On legacy systems, a Unix timestamp of this value will be subjected to
					the <Link href="https://en.wikipedia.org/wiki/Year_2038_problem">Year 2038 problem</Link>.
				</Typography>
			}
			<Stack direction="row" spacing={2} my={2}>
				<SaveScratchButton
					title={timeStore.unix.toString()}
					message={JSON.stringify({
						unix: timeStore.unix,
						literal: timeStore.string.toISOString()
					}, null, 2)}
				/>
			</Stack>
		</>
	);
}

export default UnixEpochPage;
