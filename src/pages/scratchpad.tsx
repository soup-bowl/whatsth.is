import { useEffect, useState } from "react"
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { Scratches } from "../components"
import { ScratchEditorModal } from "../modals"
import {
	addScratch,
	createItem,
	createItemViaPossible,
	getScratches,
	removeScratch,
	saveScratches,
	updateScratch,
} from "../utils/scratch"
import { IPossibleScratchpadItem, IScratchpadItem } from "../interfaces"

import AddIcon from "@mui/icons-material/Add"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import DownloadIcon from "@mui/icons-material/Download"
import UploadIcon from "@mui/icons-material/Upload"

const siteTitle = "Scratchpad"

const ScratchpadPage = () => {
	const [openNewNote, setOpenNewNote] = useState(false)
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
	const openMenuDialog = Boolean(menuAnchorEl)
	const { enqueueSnackbar } = useSnackbar()

	useEffect(() => {
		document.title = `${siteTitle} - What's This?`
	})

	const addItem = (item: IScratchpadItem) => setScratches(addScratch(scratches ?? [], item))
	const removeItem = (id: string) => setScratches(removeScratch(scratches ?? [], id))
	const updateItem = (sratch: IScratchpadItem) => setScratches(updateScratch(scratches ?? [], sratch))

	const [scratches, setScratches] = useState<IScratchpadItem[] | undefined>(getScratches())
	const [activeScratch, setActiveScratch] = useState<IScratchpadItem | undefined>(undefined)
	useEffect(() => saveScratches(scratches ?? []), [scratches])

	const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setMenuAnchorEl(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setMenuAnchorEl(null)
	}

	const handleExport = () => {
		const fileName = "scratchpad-export.json"
		const json = JSON.stringify(scratches, null, 2)
		const blob = new Blob([json], { type: "application/json" })
		const href = URL.createObjectURL(blob)

		const link = document.createElement("a")
		link.href = href
		link.download = fileName
		document.body.appendChild(link)
		link.click()

		document.body.removeChild(link)
		URL.revokeObjectURL(href)

		handleCloseMenu()
	}

	const handleImport = () => {
		const fileInput = document.createElement("input")
		fileInput.type = "file"
		fileInput.accept = ".json"
		fileInput.multiple = true

		fileInput.addEventListener("change", (event) => {
			const files = (event.target as HTMLInputElement).files
			if (files && files.length > 0) {
				for (let file of files) {
					const reader = new FileReader()

					reader.onload = (e) => {
						const text = (e.target?.result || "") as string
						try {
							const data = JSON.parse(text) as IPossibleScratchpadItem[]

							const collection = getScratches() ?? []
							let count = 0
							data.forEach((item) => {
								if (collection.find((exist) => exist.id === item.id) === undefined) {
									collection?.push(createItemViaPossible(item))
									count++
								}
							})

							saveScratches(collection)
							setScratches(collection)
							enqueueSnackbar(`Imported ${count.toString()} scratches`)
						} catch (error) {
							console.error("Error parsing file:", error)
							enqueueSnackbar("An error occurred processing the import")
						} finally {
							handleCloseMenu()
						}
					}

					reader.readAsText(file)
				}
			}
		})

		// Trigger the file input
		fileInput.click()
	}

	return (
		<>
			<Typography variant="h1" my={2}>
				{siteTitle}
			</Typography>
			<Typography>
				Store useful notes and links. <strong>This is not currently backed up</strong>, please use at your own risk.
			</Typography>
			<Box my={2}>
				<Alert severity="info">
					<AlertTitle>Beta</AlertTitle>
					This is a <strong>beta</strong> service. Please use the feedback forms to let us know what is missing!
				</Alert>
			</Box>
			<Box my={2}>
				<Alert severity="warning">
					<AlertTitle>Data Loss</AlertTitle>
					Data is stored <strong>client-side</strong>, so changing browser settings and cache-clearing can destroy data.
					Do not store essential data without backing up. <strong>Data is not encrypted</strong>.
				</Alert>
			</Box>
			<Stack direction="row" spacing={2} my={2}>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={() => {
						const newItem = createItem("New Note", "")
						addItem(newItem)
						setActiveScratch(scratches?.find((obj) => obj.id === newItem.id))
						setOpenNewNote(true)
					}}
				>
					Add
				</Button>
				<Button
					id="scratch-option-button"
					color="secondary"
					variant="contained"
					startIcon={<MoreVertIcon />}
					aria-controls={openMenuDialog ? "scratch-option-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={openMenuDialog ? "true" : undefined}
					onClick={handleClickMenu}
				>
					Options
				</Button>
			</Stack>
			<Scratches
				items={scratches?.sort((a, b) => b.created - a.created) ?? []}
				onClick={(id) => {
					setActiveScratch(scratches?.find((obj) => obj.id === id))
					setOpenNewNote(true)
				}}
				onDelete={(id) => removeItem(id)}
			/>
			{activeScratch !== undefined && (
				<ScratchEditorModal
					open={openNewNote}
					handleClose={() => setOpenNewNote(false)}
					handleSave={(item) => {
						updateItem(item)
						setOpenNewNote(false)
					}}
					item={activeScratch ?? ({} as IScratchpadItem)}
				/>
			)}
			<Menu
				id="scratch-option-menu"
				anchorEl={menuAnchorEl}
				open={openMenuDialog}
				onClose={handleCloseMenu}
				MenuListProps={{ "aria-labelledby": "scratch-option-button" }}
			>
				<MenuItem onClick={handleImport}>
					<ListItemIcon>
						<DownloadIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Import Scratches</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleExport}>
					<ListItemIcon>
						<UploadIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Export Scratches</ListItemText>
				</MenuItem>
			</Menu>
		</>
	)
}

export default ScratchpadPage
