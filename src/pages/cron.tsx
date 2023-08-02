import { Link, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { calculateCronString, checkForValidCronCode, decodeCronCode, encodeCronCode } from "../utils/cronUtils";

const CronConversionPage = () => {
	const inputGet = window.location.hash.split('/').slice(-1)[0];
	const siteTitle = "Cron Calculator";

	const [timeString, setTimeString] = useState<string>(checkForValidCronCode(inputGet) ? decodeCronCode(inputGet) : '* * * * *');
	const [timeResult, setTimeResult] = useState<string>(calculateCronString(timeString));

	const timeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTimeString(e.target.value);
	};

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	useEffect(() => {
		setTimeResult(calculateCronString(timeString));
		window.location.href = `/#/cron/${encodeCronCode(timeString)}`
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
