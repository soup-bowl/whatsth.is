import {
	Box,
	FormControl,
	GridLegacy,
	InputLabel,
	TextField,
	Typography,
	MenuItem,
	Select,
	SelectChangeEvent,
	ListSubheader,
	Stack,
} from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { ConversionType } from "../enums"
import { IStringMorph } from "../interfaces"
import { StringConversion } from "../lib"
import { SaveScratchButton } from "../components"

const siteTitle = "String Conversions"

const StringConversionPage = () => {
	const [stringMorph, setStringMorph] = useState<IStringMorph>({ decodeError: false } as IStringMorph)
	const [passphrase, setPassphrase] = useState("")
	const [type, setType] = useState<ConversionType>(ConversionType.Base64)

	useEffect(() => {
		document.title = `${siteTitle} - What's This?`
	})

	const handleTypeChange = (event: SelectChangeEvent) => {
		setType(parseInt(event.target.value))
		setStringMorph({ decodeError: false } as IStringMorph)
	}

	const handleChangePassphrase = (e: ChangeEvent<HTMLInputElement>) => {
		setPassphrase(e.target.value)
		setStringMorph({ decodeError: false } as IStringMorph)
	}

	return (
		<>
			<Typography variant="h1" my={2}>
				{siteTitle}
			</Typography>
			<Typography>Converts text from and into various forms of encoding and encryption methods.</Typography>
			<Box sx={{ flexGrow: 1, marginBottom: 2 }}>
				<GridLegacy container spacing={2} marginTop={2}>
					<GridLegacy item xs={12} sm={4}>
						<FormControl fullWidth>
							<InputLabel id="chooseConversionType">Conversion Type</InputLabel>
							<Select
								fullWidth
								label="Conversion Type"
								labelId="chooseConversionType"
								id="chooseConversionType"
								value={type.toString()}
								onChange={handleTypeChange}
							>
								<ListSubheader>Encode</ListSubheader>
								<MenuItem value={0}>Base64</MenuItem>
								<MenuItem value={1}>Hexidecimal</MenuItem>
								<MenuItem value={2}>URI</MenuItem>
								<ListSubheader>Encrypt</ListSubheader>
								<MenuItem value={10}>AES</MenuItem>
								<MenuItem value={11}>3DES</MenuItem>
							</Select>
						</FormControl>
					</GridLegacy>
					<GridLegacy item xs={12} sm={8} display={parseInt(type.toString()) >= 10 ? "inherit" : "none"}>
						<FormControl fullWidth>
							<TextField
								fullWidth
								id="passphrase"
								label="Encryption Password (optional)"
								onChange={handleChangePassphrase}
							/>
						</FormControl>
					</GridLegacy>
				</GridLegacy>
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<GridLegacy container spacing={2}>
					<GridLegacy item xs={12} sm={6}>
						<TextField
							multiline
							fullWidth
							id="encode"
							label="Convert to"
							rows={15}
							value={stringMorph.decoded}
							onChange={(e) => {
								setStringMorph({
									decoded: e.target.value,
									encoded: StringConversion("to", type, e.target.value, passphrase),
									decodeError: false,
								})
							}}
							InputLabelProps={{ shrink: true }}
						/>
					</GridLegacy>
					<GridLegacy item xs={12} sm={6}>
						<TextField
							multiline
							fullWidth
							id="decode"
							label="Convert from"
							rows={15}
							value={stringMorph.encoded}
							error={stringMorph.decodeError}
							helperText={stringMorph.decodeError ? "This value cannot be converted." : ""}
							onChange={(e) => {
								const convs = {
									encoded: e.target.value,
									decodeError: false,
								} as IStringMorph

								try {
									convs.decoded = StringConversion("from", type, e.target.value, passphrase)
								} catch {
									convs.decoded = stringMorph.decoded
									convs.decodeError = true
								}

								setStringMorph(convs)
							}}
							InputLabelProps={{ shrink: true }}
						/>
					</GridLegacy>
				</GridLegacy>
			</Box>
			<Stack direction="row" spacing={2} my={2}>
				<SaveScratchButton
					title={`${ConversionType[type]} conversion`}
					message={JSON.stringify(
						{
							type: ConversionType[type],
							encoded: stringMorph.encoded,
							decoded: stringMorph.decoded,
						},
						null,
						2
					)}
				/>
			</Stack>
		</>
	)
}

export default StringConversionPage
