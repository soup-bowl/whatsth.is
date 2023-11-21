import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IScratchpadItem } from "../interfaces";

interface ScratchItemProps {
	item: IScratchpadItem;
	onClick: (id: string) => void;
	onDelete: (id: string) => void;
}

const Scratch = ({ item, onClick, onDelete }: ScratchItemProps) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image="https://source.unsplash.com/featured"
				title={item.title}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{item.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Some stuff.
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
