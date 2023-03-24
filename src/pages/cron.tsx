import { Link, TextField, Typography } from "@mui/material";
import cronstrue from 'cronstrue';
import { useEffect, useState } from "react";

const CronConversionPage = () => {
	const inputGet = window.location.hash.slice(7);
	const siteTitle = "Cron Calculator";

	const checkValidGetCode = (input: string) => {
		input = input.split('_').join(' ');
		if (~[5, 6].indexOf(input.split(' ').length)) {
			return true;
		}
		return false;
	}
	
	const calculate = (input: string) => {
		input = input.split('_').join(' ');
		let output: string = '';
		try {
			output = cronstrue.toString(input);
		} catch {
			output = 'Unable to calculate - check string is valid';
		}
	
		return output;
	}

	const [timeString, setTimeString] = useState<string>((checkValidGetCode(inputGet)) ? inputGet.split('_').join(' ') : '* * * * *');
	const [timeResult, setTimeResult] = useState<string>(calculate(timeString));

	const timeChange = (e: any) => {
		setTimeString(e.target.value);
	};

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	useEffect(() => {
		setTimeResult(calculate(timeString));
		window.location.href = `/#/cron/${timeString.split(' ').join('_')}`
	}, [timeString]);

	return (
		<>
			<Typography variant="h1" my={2}>{siteTitle}</Typography>
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

export default CronConversionPage;
