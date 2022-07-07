import { Link, TextField, Typography } from "@mui/material";
import cronstrue from 'cronstrue';
import { useEffect, useState } from "react";

function checkValidGetCode(input: string) {
	input = input.replaceAll('_', ' ');
	if (~ [5,6].indexOf(input.split(' ').length)) {
		return true;
	}
	return false;
}

function calculate(input: string) {
	input = input.replaceAll('_', ' ');
	let output:string = '';
	try {
		output = cronstrue.toString(input);
	} catch {
		output = 'Unable to calculate - check string is valid';
	}

	return output;
}

export function CronConversionPage() {
	const inputGet = window.location.hash.slice(7);

	const [timeString, setTimeString] = useState<string>((checkValidGetCode(inputGet)) ? inputGet.replaceAll('_', ' ') : '* * * * *');
	const [timeResult, setTimeResult] = useState<string>(calculate(timeString));

	const timeChange = (e:any) => {
		setTimeString(e.target.value);
	};

	useEffect(() => {
		setTimeResult(calculate(timeString));
		window.location.href = `/#/cron/${timeString.replaceAll(' ', '_')}`
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
