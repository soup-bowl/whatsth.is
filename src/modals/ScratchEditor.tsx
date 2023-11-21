import { AppBar, Button, Container, Dialog, IconButton, TextField, Toolbar } from "@mui/material";
import { IScratchpadItem } from "../interfaces";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

interface Props {
	item: IScratchpadItem;
	open: boolean;
	handleClose: () => void;
	handleSave: (item: IScratchpadItem) => void;
}

const ScratchEditorModal = ({ item, open, handleClose, handleSave }: Props) => {
	const [text, setText] = useState<string>('');
	const [title, setTitle] = useState<string>('');

	useEffect(() => {
		setText(item.message);
		setTitle(item.title);
	}, [item]);

	const handleSaveProcess = (item: IScratchpadItem) => {
		const interimItem = item;
		interimItem.title = title;
		interimItem.message = text;
		handleSave(interimItem);
	};

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			aria-labelledby="scratch-editor-modal-title"
			aria-describedby="scratch-editor-modal-description"
		>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<TextField
						label="Title"
						variant="standard"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						sx={{ ml: 2, flex: 1 }}
					/>
					<Button autoFocus color="inherit" onClick={() => handleSaveProcess(item)}>
						Save
					</Button>
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg" style={{ paddingTop: 25 }}>
				<TextField
					multiline
					fullWidth
					rows={12}
					onChange={(e) => setText(e.target.value)}
					value={text}
				/>
			</Container>
		</Dialog>
	);
};

export default ScratchEditorModal;
