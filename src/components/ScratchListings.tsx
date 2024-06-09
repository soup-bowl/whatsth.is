import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { IScratchpadItem } from "../interfaces"
import { hexToAll } from "libwhatsthis"

interface ScratchItemProps {
	item: IScratchpadItem
	onClick: (id: string) => void
	onDelete: (id: string) => void
}

interface HeaderColours {
	lightColor: string
	darkColor: string
}

// https://mui.com/material-ui/react-avatar/
const stringToColor = (string: string) => {
	let hash = 0
	let i

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash)
	}

	let color = "#"

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.slice(-2)
	}

	return color
}

const generateColors = (title: string): HeaderColours => {
	const hex = stringToColor(title)
	const hsl = hexToAll(hex).hsl

	return {
		lightColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l + 20}%)`,
		darkColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
	}
}

const Scratch = ({ item, onClick, onDelete }: ScratchItemProps) => {
	const cols = generateColors(item.title)

	return (
		<Card sx={{ maxWidth: 345 }}>
			{item.image !== undefined ? (
				<CardMedia image={item.image} title={item.title} sx={{ height: 140 }} />
			) : (
				<Box
					sx={{
						height: 140,
						backgroundColor: cols.darkColor,
						color: cols.lightColor,
						fontFamily: "serif",
						textTransform: "uppercase",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "8em",
					}}
				>
					{item.title.slice(0, 1)}
				</Box>
			)}
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{item.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{item.message.slice(0, 20)} ...
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={() => onClick(item.id)}>
					Open
				</Button>
				<Button size="small" color="error" onClick={() => onDelete(item.id)}>
					Delete
				</Button>
			</CardActions>
		</Card>
	)
}

interface ScatchProps {
	items?: IScratchpadItem[]
	listView?: boolean
	onClick: (id: string) => void
	onDelete: (id: string) => void
}

export const Scratches = ({ items = undefined, listView = false, onClick, onDelete }: ScatchProps) => {
	if (items === undefined || items.length === 0) {
		return <Typography>No items in your scratchpad.</Typography>
	}

	return (
		<Grid container spacing={2} my={2}>
			{items.map((item, index) => (
				<Grid key={index} item xs={12} sm={listView ? 12 : 6} md={listView ? 12 : 4}>
					<Scratch item={item} key={index} onClick={onClick} onDelete={onDelete} />
				</Grid>
			))}
		</Grid>
	)
}
