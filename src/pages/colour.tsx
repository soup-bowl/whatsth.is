import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IColourValues, RGB } from "../interfaces";
import { getContrastingColor, hexToAll, isValidColorString, rgbToHex, rgbToString } from "../utils/colourUtils";

const siteTitle = "Colour Picker";

const ColourPickerPage = () => {
	const inputGet = window.location.hash.split('/').slice(-1)[0];
	const startingVal = isValidColorString(inputGet) ? inputGet : '#000000';
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
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField fullWidth
						id="hex"
						label="Hex"
						value={colours.hex}
						InputLabelProps={{ shrink: true }}
						onChange={(e) => setColours(hexToAll(e.target.value))}
					/>
				</Grid>
				<Grid container item xs={12} sm={6}>
					<Grid item xs={4}>
						<TextField fullWidth
							type="number"
							id="rgb-r"
							label="R"
							value={colours.rgb.r}
							InputProps={{ inputProps: { min: 0, max: 255 } }}
							InputLabelProps={{ shrink: true }}
							onChange={(e) => {
								const rgb: RGB = { ...colours.rgb, r: parseInt(e.target.value) }
								const hex: string = rgbToHex(rgb);
								setColours(hexToAll(hex));
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField fullWidth
							type="number"
							id="rgb-g"
							label="G"
							value={colours.rgb.g}
							InputProps={{ inputProps: { min: 0, max: 255 } }}
							InputLabelProps={{ shrink: true }}
							onChange={(e) => {
								const rgb: RGB = { ...colours.rgb, g: parseInt(e.target.value) }
								const hex: string = rgbToHex(rgb);
								setColours(hexToAll(hex));
							}}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField fullWidth
							type="number"
							id="rgb-b"
							label="B"
							value={colours.rgb.b}
							InputProps={{ inputProps: { min: 0, max: 255 } }}
							InputLabelProps={{ shrink: true }}
							onChange={(e) => {
								const rgb: RGB = { ...colours.rgb, b: parseInt(e.target.value) }
								const hex: string = rgbToHex(rgb);
								setColours(hexToAll(hex));
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Card raised={true} sx={{
				backgroundColor: colours.hex,
				backgroundImage: 'none',
				color: rgbToString(getContrastingColor(colours.rgb)),
				m: 2,
				p: 2
			}}>
				<CardContent>
					<Grid container>
						<Grid item container marginY={1}>
							<Grid item xs={12} sm={4}>
								<Typography sx={{ fontWeight: 'bold' }}>Hex</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Typography>{colours.hex}</Typography>
							</Grid>

							<Grid item xs={12} sm={4}>
								<Typography sx={{ fontWeight: 'bold' }}>RGB</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Typography>{`R: ${colours.rgb.r}, G: ${colours.rgb.g}, B: ${colours.rgb.b}`}</Typography>
							</Grid>
							
							<Grid item xs={12} sm={4}>
								<Typography sx={{ fontWeight: 'bold' }}>HSL</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Typography>{`H: ${colours.hsl.h}, S: ${colours.hsl.s}, L: ${colours.hsl.l}`}</Typography>
							</Grid>

							<Grid item xs={12} sm={4}>
								<Typography sx={{ fontWeight: 'bold' }}>CMYK</Typography>
							</Grid>
							<Grid item xs={12} sm={8}>
								<Typography>{`C: ${colours.cmyk.c}, M: ${colours.cmyk.m}, Y: ${colours.cmyk.y}, K: ${colours.cmyk.k}`}</Typography>
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
				</CardContent>
			</Card>
		</>
	);
}

export default ColourPickerPage;
