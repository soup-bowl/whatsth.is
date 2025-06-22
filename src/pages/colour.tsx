import { Button, Card, GridLegacy, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { CMYK, HSL, IColourValues, RGB, cmykToAll, hexToAll, hslToAll, isValidColorString, rgbToAll } from "../lib"
import { SaveScratchButton } from "../components"

const siteTitle = "Colour Picker"

const ColourPickerPage = () => {
	const inputGet = window.location.hash.split("/").slice(-1)[0]
	const startingVal = isValidColorString(inputGet) ? inputGet : "9c27b0"
	const [colours, setColours] = useState<IColourValues>(hexToAll(`#${startingVal}`))

	useEffect(() => {
		document.title = `${siteTitle} - What's This?`
	})

	useEffect(() => {
		if (isValidColorString(colours.hex)) {
			window.location.href = `/#/colour/${colours.hex.replace("#", "")}`
		}
	}, [colours])

	return (
		<>
			<Typography variant="h1" my={2}>
				{siteTitle}
			</Typography>
			<Typography my={2}>Select a colour you like, and convert it into many different formats.</Typography>
			<Card
				raised={true}
				sx={{
					backgroundColor: colours.hex,
					backgroundImage: "none",
					m: 2,
					height: 50,
				}}
			/>
			<GridLegacy container>
				<GridLegacy item container marginY={1}>
					<GridLegacy item xs={12} sm={4}>
						<Typography sx={{ fontWeight: "bold" }}>Picker</Typography>
					</GridLegacy>
					<GridLegacy item xs={12} sm={8}>
						<input
							type="color"
							value={colours.hex}
							onChange={(e) => {
								setColours(hexToAll(e.target.value))
							}}
						/>
					</GridLegacy>
				</GridLegacy>

				<GridLegacy item container marginY={1}>
					<GridLegacy item xs={12} sm={4}>
						<Typography sx={{ fontWeight: "bold" }}>Hex</Typography>
					</GridLegacy>
					<GridLegacy item xs={10} sm={6}>
						<TextField
							fullWidth
							variant="standard"
							value={colours.hex}
							onChange={(e) => setColours(hexToAll(e.target.value))}
						/>
					</GridLegacy>
					<GridLegacy item xs={2} container justifyContent="center" alignItems="center">
						<Button
							variant="text"
							color="secondary"
							onClick={() => {
								navigator.clipboard.writeText(colours.hex)
							}}
						>
							Copy
						</Button>
					</GridLegacy>
				</GridLegacy>

				<GridLegacy item container marginY={1}>
					<GridLegacy item xs={12} sm={4}>
						<Typography sx={{ fontWeight: "bold" }}>RGB</Typography>
					</GridLegacy>
					<GridLegacy item xs={10} sm={6} container>
						<GridLegacy item xs={4}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.rgb.r}
								InputProps={{
									inputProps: { min: 0, max: 255 },
									startAdornment: <InputAdornment position="start">R</InputAdornment>,
								}}
								onChange={(e) => {
									const rgb: RGB = { ...colours.rgb, r: parseInt(e.target.value) }
									setColours(rgbToAll(rgb))
								}}
							/>
						</GridLegacy>
						<GridLegacy item xs={4}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.rgb.g}
								InputProps={{
									inputProps: { min: 0, max: 255 },
									startAdornment: <InputAdornment position="start">G</InputAdornment>,
								}}
								onChange={(e) => {
									const rgb: RGB = { ...colours.rgb, g: parseInt(e.target.value) }
									setColours(rgbToAll(rgb))
								}}
							/>
						</GridLegacy>
						<GridLegacy item xs={4}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.rgb.b}
								InputProps={{
									inputProps: { min: 0, max: 255 },
									startAdornment: <InputAdornment position="start">B</InputAdornment>,
								}}
								onChange={(e) => {
									const rgb: RGB = { ...colours.rgb, b: parseInt(e.target.value) }
									setColours(rgbToAll(rgb))
								}}
							/>
						</GridLegacy>
					</GridLegacy>
					<GridLegacy item xs={2} container justifyContent="center" alignItems="center">
						<Button
							variant="text"
							color="secondary"
							onClick={() => {
								navigator.clipboard.writeText(`rgb(${colours.rgb.r},${colours.rgb.g},${colours.rgb.b})`)
							}}
						>
							Copy
						</Button>
					</GridLegacy>
				</GridLegacy>

				<GridLegacy item container marginY={1}>
					<GridLegacy item xs={12} sm={4}>
						<Typography sx={{ fontWeight: "bold" }}>HSL</Typography>
					</GridLegacy>
					<GridLegacy item xs={10} sm={6} container>
						<GridLegacy item xs={4}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.hsl.h}
								InputProps={{
									inputProps: { min: 0, max: 359 },
									startAdornment: <InputAdornment position="start">H</InputAdornment>,
								}}
								onChange={(e) => {
									const hsl: HSL = { ...colours.hsl, h: parseInt(e.target.value) }
									setColours(hslToAll(hsl))
								}}
							/>
						</GridLegacy>
						<GridLegacy item xs={4}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.hsl.s}
								InputProps={{
									inputProps: { min: 0, max: 100 },
									startAdornment: <InputAdornment position="start">S</InputAdornment>,
									endAdornment: (
										<InputAdornment position="end" sx={{ marginRight: 0.5 }}>
											%
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									const hsl: HSL = { ...colours.hsl, s: parseInt(e.target.value) }
									setColours(hslToAll(hsl))
								}}
							/>
						</GridLegacy>
						<GridLegacy item xs={4}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.hsl.l}
								InputProps={{
									inputProps: { min: 0, max: 100 },
									startAdornment: <InputAdornment position="start">L</InputAdornment>,
									endAdornment: (
										<InputAdornment position="end" sx={{ marginRight: 0.5 }}>
											%
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									const hsl: HSL = { ...colours.hsl, l: parseInt(e.target.value) }
									setColours(hslToAll(hsl))
								}}
							/>
						</GridLegacy>
					</GridLegacy>
					<GridLegacy item xs={2} container justifyContent="center" alignItems="center">
						<Button
							variant="text"
							color="secondary"
							onClick={() => {
								navigator.clipboard.writeText(`hsl(${colours.hsl.h}, ${colours.hsl.s}%, ${colours.hsl.l}%)`)
							}}
						>
							Copy
						</Button>
					</GridLegacy>
				</GridLegacy>

				<GridLegacy item container marginY={1}>
					<GridLegacy item xs={12} sm={4}>
						<Typography sx={{ fontWeight: "bold" }}>CMYK</Typography>
					</GridLegacy>
					<GridLegacy item xs={10} sm={6} container>
						<GridLegacy item xs={6} md={3}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.cmyk.c}
								InputProps={{
									inputProps: { min: 0, max: 100 },
									startAdornment: <InputAdornment position="start">C</InputAdornment>,
									endAdornment: (
										<InputAdornment position="end" sx={{ marginRight: 0.5 }}>
											%
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									const cmyk: CMYK = { ...colours.cmyk, c: parseInt(e.target.value) }
									setColours(cmykToAll(cmyk))
								}}
							/>
						</GridLegacy>
						<GridLegacy item xs={6} md={3}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.cmyk.m}
								InputProps={{
									inputProps: { min: 0, max: 100 },
									startAdornment: <InputAdornment position="start">M</InputAdornment>,
									endAdornment: (
										<InputAdornment position="end" sx={{ marginRight: 0.5 }}>
											%
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									const cmyk: CMYK = { ...colours.cmyk, m: parseInt(e.target.value) }
									setColours(cmykToAll(cmyk))
								}}
							/>
						</GridLegacy>
						<GridLegacy item xs={6} md={3}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.cmyk.y}
								InputProps={{
									inputProps: { min: 0, max: 100 },
									startAdornment: <InputAdornment position="start">Y</InputAdornment>,
									endAdornment: (
										<InputAdornment position="end" sx={{ marginRight: 0.5 }}>
											%
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									const cmyk: CMYK = { ...colours.cmyk, y: parseInt(e.target.value) }
									setColours(cmykToAll(cmyk))
								}}
							/>
						</GridLegacy>
						<GridLegacy item xs={6} md={3}>
							<TextField
								fullWidth
								variant="standard"
								type="number"
								value={colours.cmyk.k}
								InputProps={{
									inputProps: { min: 0, max: 100 },
									startAdornment: <InputAdornment position="start">K</InputAdornment>,
									endAdornment: (
										<InputAdornment position="end" sx={{ marginRight: 0.5 }}>
											%
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									const cmyk: CMYK = { ...colours.cmyk, k: parseInt(e.target.value) }
									setColours(cmykToAll(cmyk))
								}}
							/>
						</GridLegacy>
					</GridLegacy>
					<GridLegacy item xs={2} container justifyContent="center" alignItems="center">
						<Button
							variant="text"
							color="secondary"
							onClick={() => {
								navigator.clipboard.writeText(
									`cmyk(${colours.cmyk.c}%, ${colours.cmyk.m}%, ${colours.cmyk.y}%, ${colours.cmyk.k}%)`
								)
							}}
						>
							Copy
						</Button>
					</GridLegacy>
				</GridLegacy>

				<GridLegacy item container marginY={1}>
					<GridLegacy item xs={12} sm={4}>
						<Typography sx={{ fontWeight: "bold" }}>HTML Name</Typography>
					</GridLegacy>
					<GridLegacy item xs={12} sm={6}>
						<Typography>{colours.htmlCode}</Typography>
					</GridLegacy>
				</GridLegacy>

				<GridLegacy item container marginY={1}>
					<GridLegacy item xs={12} sm={4}>
						<Typography sx={{ fontWeight: "bold" }}>XKCD Name</Typography>
					</GridLegacy>
					<GridLegacy item xs={12} sm={6}>
						<Typography>{colours.xkcdCode}</Typography>
					</GridLegacy>
				</GridLegacy>

				<GridLegacy item container marginY={1}>
					<GridLegacy item xs={12} sm={4}>
						<Typography sx={{ fontWeight: "bold" }}>0x Variant</Typography>
					</GridLegacy>
					<GridLegacy item xs={12} sm={6}>
						<Typography>{colours.oxVar}</Typography>
					</GridLegacy>
				</GridLegacy>
			</GridLegacy>
			<Stack direction="row" spacing={2} my={2}>
				<SaveScratchButton title={`${colours.hex} details`} message={JSON.stringify(colours, null, 2)} />
			</Stack>
		</>
	)
}

export default ColourPickerPage
