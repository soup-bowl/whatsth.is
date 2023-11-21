import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IScratchpadItem } from "../interfaces";
import { hslToAll } from "libwhatsthis";

interface ScratchItemProps {
	item: IScratchpadItem;
	onClick: (id: string) => void;
	onDelete: (id: string) => void;
}

interface HeaderColours {
	lightColor: string;
	darkColor: string;
}

const generateColors = (timestamp: number): HeaderColours => {
	const hue = timestamp % 1;
	const lightness = 0.5;
	const saturation = 0.7;

	const lightColor = hslToAll({ h: hue, l: lightness, s: saturation }).rgb;
	const darkColor = hslToAll({ h: hue, l: 0.25, s: saturation }).rgb;

	return {
		lightColor: `#${lightColor.r.toString(16).padStart(2, '0')}${lightColor.g.toString(16).padStart(2, '0')}${lightColor.b.toString(16).padStart(2, '0')}`,
		darkColor: `#${darkColor.r.toString(16).padStart(2, '0')}${darkColor.g.toString(16).padStart(2, '0')}${darkColor.b.toString(16).padStart(2, '0')}`,
	};
}

const Scratch = ({ item, onClick, onDelete }: ScratchItemProps) => {
	const cols = generateColors(item.created);

	return (
		<Card sx={{ maxWidth: 345 }}>
			{item.image !== undefined ?
				<CardMedia image={item.image} title={item.title} sx={{ height: 140 }} />
				:
				<Box sx={{
					height: 140,
					backgroundColor: cols.darkColor,
					color: cols.lightColor,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '8em'
				}}>
					{item.title.slice(0, 1)}
				</Box>
			}
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{item.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{item.message.slice(0, 20)} ...
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={() => onClick(item.id)}>Open</Button>
				<Button size="small" onClick={() => onDelete(item.id)}>Delete</Button>
			</CardActions>
		</Card>
	);
};

interface ScatchProps {
	items?: IScratchpadItem[];
	listView?: boolean;
	onClick: (id: string) => void;
	onDelete: (id: string) => void;
}

export const Scratches = ({ items = undefined, listView = false, onClick, onDelete }: ScatchProps) => {
	if (items === undefined || items.length === 0) {
		return (<Typography>No items in your scratchpad.</Typography>);
	}

	return (
		<Grid container spacing={2} my={2}>
			{items.map((item, index) => (
				<Grid key={index} item xs={12} sm={(listView) ? 12 : 6} md={(listView) ? 12 : 4}>
					<Scratch item={item} key={index} onClick={onClick} onDelete={onDelete} />
				</Grid>
			))}
		</Grid>
	);
};
