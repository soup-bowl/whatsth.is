import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IColourValues, RGB } from "../interfaces";
import { hexToRgb, isValidColorString, rgbToHex } from "../utils/colourUtils";
import { ChromePicker } from "react-color";

const siteTitle = "Colour Picker";

const ColourPickerPage = () => {
	const inputGet = window.location.hash.split('/').slice(-1)[0];
	const startingVal = isValidColorString(inputGet) ? inputGet : '#000000';
	const [colours, setColours] = useState<IColourValues>({ hex: startingVal, rgb: hexToRgb(startingVal) });
	const [displayPicker, setDisplayPicker] = useState(false);

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
			</Grid>
			<Card
				sx={{ backgroundColor: colours.hex, m: 2, height: 50 }}
				raised={true}
				onClick={() => setDisplayPicker(true)}
			/>
			{displayPicker ??
				<ChromePicker
					color={colours.hex}
					onChangeComplete={(colour) => {
						setColours({
							hex: colour.hex,
							rgb: hexToRgb(colour.hex)
						})
					}}
					disableAlpha
				/>
			}
		</>
	);
}

export default ColourPickerPage;
