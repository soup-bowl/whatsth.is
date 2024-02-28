
import { Grid, Switch, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";

const siteTitle = "Options";

interface Props {
	mode: any;
	setMode: any;
}

const OptionsPage = ({ mode, setMode }: Props) => {
	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode: string) => {
				const cmode = (prevMode === 'light') ? 'dark' : 'light';
				localStorage.setItem('ColourPref', cmode);
				return cmode;
			});
		},
	}), []);

	const colourToBoolean = (input: string): boolean => ((input === 'light') ? false : true);

	return (
		<>
			<Typography variant="h1" my={2}>{siteTitle}</Typography>
			<Grid container spacing={2} my={2}>
				<Grid item xs={6} sm={4}>
					<Typography variant="h6" component="h2">Dark Mode</Typography>
				</Grid>
				<Grid item xs={6} sm={8}>
					<Switch
						checked={colourToBoolean(mode)}
						onClick={colorMode.toggleColorMode}
						inputProps={{ 'aria-label': 'Dark mode toggle' }}
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default OptionsPage;
