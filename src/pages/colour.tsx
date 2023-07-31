import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IColourValues, RGB } from "../interfaces";
import { getContrastingColor, hexToAll, isValidColorString, rgbToHex, rgbToString } from "../utils/colourUtils";

const siteTitle = "Colour Picker";

const ColourPickerPage = () => {
	const inputGet = window.location.hash.split('/').slice(-1)[0];
	const startingVal = isValidColorString(inputGet) ? inputGet : '9c27b0';
	const [colours, setColours] = useState<IColourValues>(hexToAll(`#${startingVal}`));

	useEffect(() => {
		if (isValidColorString(colours.hex)) {
			window.location.href = `/#/colour/${colours.hex.replace('#', '')}`
		}
	}, [colours]);

	return (
		<>
			<Typography variant="h1" my={2}>{siteTitle}</Typography>
			<Typography my={2}>Select a colour you like, and convert it into many different formats.</Typography>
			<Card raised={true} sx={{
				backgroundColor: colours.hex,
				backgroundImage: 'none',
				m: 2,
				height: 50
			}} />
			<Grid container>
				<Grid item container marginY={1}>
				<Grid item xs={12} sm={4}>
						<Typography sx={{ fontWeight: 'bold' }}>Picker</Typography>
					</Grid>
					<Grid item xs={12} sm={8}>
						<input type="color" value={colours.hex} onChange={(e) => {
							setColours(hexToAll(e.target.value));
						}} />
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography sx={{ fontWeight: 'bold' }}>Hex</Typography>
					</Grid>
					<Grid item xs={10} sm={6}>
						<TextField fullWidth
							variant="standard"
							value={colours.hex}
							onChange={(e) => setColours(hexToAll(e.target.value))}
						/>
					</Grid>
					<Grid item xs={2} container justifyContent="center" alignItems="center">
						<Button variant="text" color="secondary" onClick={() => {
							navigator.clipboard.writeText(colours.hex);
						}}>Copy</Button>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography sx={{ fontWeight: 'bold' }}>RGB</Typography>
					</Grid>
					<Grid item xs={10} sm={6} container>
						<Grid item xs={4}>
							<TextField fullWidth
								variant="standard"
								type="number"
								value={colours.rgb.r}
								InputProps={{ inputProps: { min: 0, max: 255 } }}
								onChange={(e) => {
									const rgb: RGB = { ...colours.rgb, r: parseInt(e.target.value) }
									const hex: string = rgbToHex(rgb);
									setColours(hexToAll(hex));
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField fullWidth
								variant="standard"
								type="number"
								value={colours.rgb.g}
								InputProps={{ inputProps: { min: 0, max: 255 } }}
								onChange={(e) => {
									const rgb: RGB = { ...colours.rgb, g: parseInt(e.target.value) }
									const hex: string = rgbToHex(rgb);
									setColours(hexToAll(hex));
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField fullWidth
								variant="standard"
								type="number"
								value={colours.rgb.b}
								InputProps={{ inputProps: { min: 0, max: 255 } }}
								onChange={(e) => {
									const rgb: RGB = { ...colours.rgb, b: parseInt(e.target.value) }
									const hex: string = rgbToHex(rgb);
									setColours(hexToAll(hex));
								}}
							/>
						</Grid>
					</Grid>
					<Grid item xs={2} container justifyContent="center" alignItems="center">
						<Button variant="text" color="secondary" onClick={() => {
							navigator.clipboard.writeText(`rgb(${colours.rgb.r},${colours.rgb.g},${colours.rgb.b})`);
						}}>Copy</Button>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography sx={{ fontWeight: 'bold' }}>HSL</Typography>
					</Grid>
					<Grid item xs={10} sm={6}>
						<Typography>{`H: ${colours.hsl.h}, S: ${colours.hsl.s}, L: ${colours.hsl.l}`}</Typography>
					</Grid>
					<Grid item xs={2} container justifyContent="center" alignItems="center">
						<Button variant="text" color="secondary" onClick={() => {
							navigator.clipboard.writeText(`hsl(${colours.hsl.h}, ${colours.hsl.s}%, ${colours.hsl.l}%)`);
						}}>Copy</Button>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography sx={{ fontWeight: 'bold' }}>CMYK</Typography>
					</Grid>
					<Grid item xs={10} sm={6}>
						<Typography>{`C: ${colours.cmyk.c}, M: ${colours.cmyk.m}, Y: ${colours.cmyk.y}, K: ${colours.cmyk.k}`}</Typography>
					</Grid>
					<Grid item xs={2} container justifyContent="center" alignItems="center">
						<Button variant="text" color="secondary" onClick={() => {
							navigator.clipboard.writeText(`cmyk(${colours.cmyk.c}%, ${colours.cmyk.m}%, ${colours.cmyk.y}%, ${colours.cmyk.k}%)`);
						}}>Copy</Button>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography sx={{ fontWeight: 'bold' }}>HTML Name</Typography>
					</Grid>
					<Grid item xs={12} sm={8}>
						<Typography>{colours.htmlCode}</Typography>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography sx={{ fontWeight: 'bold' }}>XKCD Name</Typography>
					</Grid>
					<Grid item xs={12} sm={8}>
						<Typography>{colours.xkcdCode}</Typography>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography sx={{ fontWeight: 'bold' }}>0x Variant</Typography>
					</Grid>
					<Grid item xs={12} sm={8}>
						<Typography>{colours.oxVar}</Typography>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default ColourPickerPage;
