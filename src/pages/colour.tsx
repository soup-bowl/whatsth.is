import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CMYK, HSL, IColourValues, RGB } from "../interfaces";
import {
	getContrastingColor, getHTMLColorName, getXKCDColorName, hexToRgb, isValidColorString, rgbToCMYK,
	rgbToHSL, rgbToHex, rgbToString
} from "../utils/colourUtils";

const siteTitle = "Colour Picker";

interface IList {
	key: string;
	value: string;
}

const ColourPickerPage = () => {
	const inputGet = window.location.hash.split('/').slice(-1)[0];
	const startingVal = isValidColorString(inputGet) ? inputGet : '#000000';
	const [colours, setColours] = useState<IColourValues>({ hex: `#${startingVal}`, rgb: hexToRgb(startingVal) });
	const [colourInfo, setColourInfo] = useState<IList[]>([]);
	const [displayPicker, setDisplayPicker] = useState(false);

	useEffect(() => {
		if (isValidColorString(colours.hex)) {
			window.location.href = `/#/colour/${colours.hex.replace('#', '')}`
		}

		const hsl: HSL = rgbToHSL(colours.rgb);
		const cmyk: CMYK = rgbToCMYK(colours.rgb);
		setColourInfo([
			{ key: 'HSL', value: `H: ${hsl.h}, S: ${hsl.s}, L: ${hsl.l}` },
			{ key: 'CMYK', value: `C: ${cmyk.c}, M: ${cmyk.m}, Y: ${cmyk.y}, K: ${cmyk.k}` },
			{ key: 'HTML Name', value: getHTMLColorName(colours.hex) },
			{ key: 'XKCD Name', value: getXKCDColorName(colours.hex) },
			{ key: '0x Variant', value: colours.hex.replace('#', '0x') },
		]);
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
						onChange={(e) => {
							setColours({
								hex: e.target.value,
								rgb: hexToRgb(e.target.value)
							});
						}}
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
								let changedVals: RGB = { ...colours.rgb, r: parseInt(e.target.value) }
								setColours({
									hex: rgbToHex(changedVals),
									rgb: changedVals
								});
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
								let changedVals: RGB = { ...colours.rgb, g: parseInt(e.target.value) }
								setColours({
									hex: rgbToHex(changedVals),
									rgb: changedVals
								});
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
								let changedVals: RGB = { ...colours.rgb, b: parseInt(e.target.value) }
								setColours({
									hex: rgbToHex(changedVals),
									rgb: changedVals
								});
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Card raised={true} sx={{ backgroundColor: colours.hex, color: rgbToString(getContrastingColor(colours.rgb)), m: 2, p: 2 }}>
				<CardContent>
					<Grid container>
						{colourInfo.map((item) => (
							<Grid key={item.key} item container>
								<Grid item xs={12} sm={4}>
									<Typography sx={{ fontWeight: 'bold' }}>{item.key}</Typography>
								</Grid>
								<Grid item xs={12} sm={8}>
									<Typography>{item.value}</Typography>
								</Grid>
							</Grid>
						))}
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}

export default ColourPickerPage;
