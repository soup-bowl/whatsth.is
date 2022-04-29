import { useNavigate } from 'react-router-dom';
import { Link, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import CachedIcon from '@mui/icons-material/Cached';

export default function NavDrawer() {
	const navigate = useNavigate();

	return (
		<>
		<List>
			<ListItem button onClick={() => navigate('/')}>
				<ListItemIcon><HomeIcon /></ListItemIcon>
				<ListItemText primary="Home" />
			</ListItem>
			<ListItem button onClick={() => navigate('/inspect')}>
				<ListItemIcon><TravelExploreIcon /></ListItemIcon>
				<ListItemText primary="Site Inspector" />
			</ListItem>
			<ListItem button onClick={() => navigate('/convert')}>
				<ListItemIcon><CachedIcon /></ListItemIcon>
				<ListItemText primary="String Conversion" />
			</ListItem>
		</List>
		<Divider />
		<List>
			<ListItem button component={Link} href="https://soupbowl.io/projects/whatsthis">
				<ListItemIcon><CodeIcon /></ListItemIcon>
				<ListItemText primary="Made by Soupbowl" />
			</ListItem>
			<ListItem button component={Link} href="https://github.com/soup-bowl/whatsth.is">
				<ListItemIcon><GitHubIcon /></ListItemIcon>
				<ListItemText primary="Source Code" />
			</ListItem>
		</List>
		</>
	);
};
