import { Outlet } from "react-router-dom";
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import ResponsiveAppBar from "./_navBar";
import theme from "../theme/theme";

export default function Layout() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ResponsiveAppBar />
			<Container maxWidth="md">
				<Outlet />
			</Container>
		</ThemeProvider>
	)
};
