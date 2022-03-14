import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: red,
	},
	typography: {
		button: {
			textTransform: 'none'
		}
	}
});

export default theme;
