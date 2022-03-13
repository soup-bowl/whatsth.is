import { Outlet } from "react-router-dom";
import {Container} from '@mui/material';
import ResponsiveAppBar from "./_navBar";

const Layout = () => {
	return (
		<>
			<ResponsiveAppBar />
			<Container maxWidth="sm">
				<h1>What's this?</h1>
				<Outlet />
			</Container>
		</>
	)
};

export default Layout;
