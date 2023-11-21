import { useEffect, useState } from "react";
import { Alert, AlertTitle, Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Scratches } from "../components/ScratchListings";
import { IScratchpadItem } from "../interfaces";
import { ScratchpadItemType } from "../enums";
import { ScratchEditorModal } from "../modals";

const siteTitle = "Scratchpad";

const ScratchpadPage = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

	const readFromLocalStorage = (key: string): IScratchpadItem[] | undefined => {
		const value = localStorage.getItem(key);

		if (value) {
			return JSON.parse(value);
		}

		return undefined;
	}

	const writeToLocalStorage = (key: string, value: IScratchpadItem[]) => localStorage.setItem(key, JSON.stringify(value));

	const getScratches = () => readFromLocalStorage('WTScratchpadItems');
	const saveScratches = (items: IScratchpadItem[]) => writeToLocalStorage('WTScratchpadItems', items);

	const addScratch = (item: IScratchpadItem) => {
		let items = getScratches();

		if (items === undefined) {
			items = [];
		}

		items.push(item);

		setScratches(items);
	};

	const removeScratch = (id: string) => setScratches(getScratches()?.filter(item => item.id !== id) ?? []);

	const updateScratch = (sratch: IScratchpadItem) => {
		let items = getScratches()?.filter(item => item.id !== sratch.id) ?? [];
		items.push(sratch);
		setScratches(items);
	};

	const createItem = (title: string, message: string): IScratchpadItem => ({
		id: self.crypto.randomUUID(),
		created: Date.now(),
		type: ScratchpadItemType.Text,
		title: title,
		message: message,
	});

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
				<Button variant="contained" startIcon={<AddIcon />} onClick={() => addScratch(createItem("New Note", ""))}>
					Add
				</Button>
			</Stack>
			<Scratches
				items={scratches?.sort((a, b) => b.created - a.created) ?? []}
				onClick={(id) => {
					setActiveScratch(scratches?.find(obj => obj.id === id));
					setOpen(true);
				}}
				onDelete={(id) => removeScratch(id)}
			/>
			{activeScratch !== undefined && <ScratchEditorModal
				open={open}
				handleClose={() => setOpen(false)}
				handleSave={(item) => {
					updateScratch(item);
					setOpen(false);
				}}
				item={activeScratch ?? {} as IScratchpadItem}
			/>}
		</>
	);
}

export default ScratchpadPage;
