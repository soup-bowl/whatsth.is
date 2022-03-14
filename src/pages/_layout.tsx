import { Outlet } from "react-router-dom";
import {Container, ThemeProvider} from '@mui/material';
import ResponsiveAppBar from "./_navBar";
import theme from "../theme/theme";

const Layout = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<ResponsiveAppBar />
				<Container maxWidth="md">
					<Outlet />
				</Container>
			</ThemeProvider>
		</>
	)
};

export default Layout;
