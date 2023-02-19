import { Box, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';
import { ITime } from "../interfaces";
import { SecondType } from "../enums";

const siteTitle = "Unix Timestamp Conversion";
const maxInt32 = 2147483647;
const MaxAcceptUnix = 253402300799999;

export default function UnixEpochPage() {
	function timeOutput(time: number): ITime {
		if (time > MaxAcceptUnix) {
			try {
				return timeStore;
			} catch {
				return timeOutput(MaxAcceptUnix);
			}
		}

		let conversionDate: Date = (time >= 1e11) ? new Date(time) : new Date(time * 1e3);

		return {
			string: conversionDate,
			unix: time,
			overflow: (time > maxInt32) ? true : false,
			type: (time >= 1e11) ? SecondType.ms : SecondType.s,
		}
	}

	const [timeStore, setTimeStore] = useState<ITime>((): ITime => {
		const inputGet: string = window.location.hash.slice(7);
		const inputIsNumber: boolean = /^\d+$/.test(inputGet);

		return timeOutput(
			(inputIsNumber) ? parseInt(inputGet) : Math.floor(Date.now() / 1e3)
		);
	});

	useEffect(() => { document.title = `${siteTitle} - What's This?` }, []);

	useEffect(() => {
		window.location.href = `/#/time/${timeStore.unix}`
	}, [timeStore]);

	const changeDateTime = (e: any) => {
		let conversionDate: Date = new Date(e.target.value);
		let ts: number = ((conversionDate.getTime() / 1e3) >= 1e11) ?
			conversionDate.getTime() : Math.floor((conversionDate.getTime() / 1e3));

		setTimeStore(timeOutput(ts));
	};

	const changeUnix = (e: any) => {
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
		</>
	);
}
