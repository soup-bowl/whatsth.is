import { createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';

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
		primary: purple,
		mode: 'dark'
	},
	typography: {
		button: {
			textTransform: 'none'
		}
	}
});

export default theme;
