import { Box, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';

interface ITime {
	string: Date;
	unix: number;
	overflow: boolean;
}

export default function UnixEpochPage() {
	const [timeStore, setTimeStore] = useState<ITime>({string: new Date(), unix: Math.floor(Date.now() / 1000), overflow: false});

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
			<Typography variant="h3" component="h1" my={2}>Unix Timestamp Conversion</Typography>
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
					value={timeStore.string.toISOString().slice(0, -5)}
					onChange={changeDateTime}
				/>
			</Box>
			<Box my={2}>
				<TextField fullWidth
					id="computerDTString"
					label="Unix Epoch String"
					type="number"
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
