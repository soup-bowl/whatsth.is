import { useEffect, useState } from "react";
import { Alert, AlertTitle, Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Scratches } from "../components/ScratchListings";
import { ScratchEditorModal } from "../modals";
import { addScratch, createItem, getScratches, removeScratch, saveScratches, updateScratch } from "../utils/scratch";
import { IScratchpadItem } from "../interfaces";

const siteTitle = "Scratchpad";

const ScratchpadPage = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	const addItem = (item: IScratchpadItem) => setScratches(addScratch(scratches ?? [], item));
	const removeItem = (id: string) => setScratches(removeScratch(scratches ?? [], id));
	const updateItem = (sratch: IScratchpadItem) => setScratches(updateScratch(scratches ?? [], sratch));

	const [scratches, setScratches] = useState<IScratchpadItem[] | undefined>(getScratches());
	const [activeScratch, setActiveScratch] = useState<IScratchpadItem | undefined>(undefined);
	useEffect(() => saveScratches(scratches ?? []), [scratches]);

	return (
		<>
			<Typography variant="h1" my={2}>{siteTitle}</Typography>
			<Typography>
				Store useful notes and links. <strong>This is not currently backed up</strong>, please use at your own risk.
			</Typography>
			<Box my={2}>
				<Alert severity="info">
					<AlertTitle>Beta</AlertTitle>
					This is a <strong>beta</strong> service. Please use the feedback forms to let us know what is missing!
				</Alert>
			</Box>
			<Stack direction="row" spacing={2} my={2}>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={() => {
						const newItem = createItem("New Note", "");
						addItem(newItem);
						setActiveScratch(scratches?.find(obj => obj.id === newItem.id));
						setOpen(true);
					}}
				>
					Add
				</Button>
			</Stack>
			<Scratches
				items={scratches?.sort((a, b) => b.created - a.created) ?? []}
				onClick={(id) => {
					setActiveScratch(scratches?.find(obj => obj.id === id));
					setOpen(true);
				}}
				onDelete={(id) => removeItem(id)}
			/>
			{activeScratch !== undefined && <ScratchEditorModal
				open={open}
				handleClose={() => setOpen(false)}
				handleSave={(item) => {
					updateItem(item);
					setOpen(false);
				}}
				item={activeScratch ?? {} as IScratchpadItem}
			/>}
		</>
	);
}

export default ScratchpadPage;
