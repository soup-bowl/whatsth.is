import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Link, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const title = "What's this?";
const pages = [
	['By Soupbowl', 'https://soupbowl.io/projects/whatsthis'],
	['Source', 'https://github.com/soup-bowl/whatsth.is']
];

const ResponsiveAppBar = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Avatar src="logo512.png" sx={{ mr: 1 }} variant="square" />
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
					>
						{title}
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page[0]} onClick={handleCloseNavMenu}>
									<Link underline="none" textAlign="center" href={page[1]}>{page[0]}</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
					>
						{title}
					</Typography>
					<Typography sx={{ color: 'darkgrey', fontVariant: 'small-caps' }}>BETA</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page[0]}
								href={page[1]}
								sx={{ my: 2, color: 'lightgrey', display: 'block' }}
							>
								{page[0]}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default ResponsiveAppBar;
