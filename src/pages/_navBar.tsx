import { Link, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router-dom';

export default function NavDrawer() {
	const navigate = useNavigate();

	return (
		<>
		<List>
			<ListItem button onClick={() => navigate('/inspect')}>
				<ListItemIcon><TravelExploreIcon /></ListItemIcon>
				<ListItemText primary="Site Inspector" />
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
