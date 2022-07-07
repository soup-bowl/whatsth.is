import { Link, TextField, Typography } from "@mui/material";
import cronstrue from 'cronstrue';
import { useEffect, useState } from "react";

export function CronConversionPage() {
	const [timeString, setTimeString] = useState<string>('* * * * *');
	const [timeResult, setTimeResult] = useState<string>(calculate(timeString));

	function calculate(input: string) {
		let output:string = '';
		try {
			output = cronstrue.toString(timeString);
		} catch {
			output = 'Unable to calculate - check string is valid';
		}

		return output;
	}

	const timeChange = (e:any) => {
		setTimeString(e.target.value);
	};

	useEffect(() => {
		setTimeResult(calculate(timeString));
	}, [timeString]);

	return(
		<>
			<Typography variant="h3" component="h1" my={2}>Cron Calculator</Typography>
			<Typography my={2}>Convert crontab time strings into human-readable format. Uses the <Link href="https://www.npmjs.com/package/cronstrue">cRonstrue library</Link>.</Typography>
			<TextField fullWidth
				id="timestring"
				value={timeString}
				label="Time String"
				variant="outlined"
				onChange={timeChange}
			/>
			<Typography my={2}>Equates to:</Typography>
			<Typography my={2} variant="h4">{timeResult}</Typography>
		</>
	);
};
