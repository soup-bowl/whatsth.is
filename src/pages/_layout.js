import { Outlet } from "react-router-dom";
import {Container} from '@mui/material';

const Layout = () => {
  return (
    <>
      <Container maxWidth="sm">
		<h1>What's this?</h1>

      	<Outlet />
	  </Container>
    </>
  )
};

export default Layout;
