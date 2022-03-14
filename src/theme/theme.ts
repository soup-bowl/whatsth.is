import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string;
		};
	}

	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
}

const theme = createTheme({
	palette: {
		primary: green,
		mode: 'dark'
	},
	typography: {
		button: {
			textTransform: 'none'
		}
	}
});

export default theme;
