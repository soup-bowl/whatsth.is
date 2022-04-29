import { Box, FormControl, Grid, InputLabel, TextField, Typography,
	MenuItem, Select, SelectChangeEvent, ListSubheader } from "@mui/material";
import { useState } from "react";

interface StringMorph {
	decoded: string;
	encoded: string;
}

enum ConversionType {
	Base64,
	Hex,
}

export default function StringConversionPage() {
	const [stringMorph, setStringMorph] = useState<StringMorph>({encoded: '', decoded: ''});
	const [type, setType] = useState<ConversionType>(ConversionType.Base64);

	const handleTypeChange = (event: SelectChangeEvent) => {
		setType(parseInt(event.target.value));
		setStringMorph({encoded: '', decoded: ''});
	};

	function ConvertTo(thing:string) {
		switch (type) {
			case ConversionType.Base64:
				return btoa(thing);
			case ConversionType.Hex:
				// https://stackoverflow.com/a/60435654
				return thing.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
			default:
				return thing;
		}
	}
	
	function ConvertFrom(thing:string) {
		switch (type) {
			case ConversionType.Base64:
				return atob(thing);
			case ConversionType.Hex:
				// https://stackoverflow.com/a/60435654
				return thing.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("")
			default:
				return thing;
		}
	}

	return(
		<>
		<Typography variant="h3" component="h1" my={2}>String Conversions</Typography>
		<Box sx={{ flexGrow: 1, marginBottom: 2 }}>
			<Grid container spacing={2} columns={{ xs: 2, sm: 8}}>
				<Grid item>
					<FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
						<InputLabel id="chooseConversionType">Conversion Type</InputLabel>
						<Select
						labelId="chooseConversionType"
						id="chooseConversionType"
						value={type.toString()}
						onChange={handleTypeChange}
						>
							<ListSubheader>Encode</ListSubheader>
							<MenuItem value={0}>Base64</MenuItem>
							<MenuItem value={1}>Hexidecimal</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</Box>
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} columns={{ xs: 2, sm: 8}}>
				<Grid item xs={2} sm={4} md={4}>
					<TextField id="encode" label="Encode" multiline fullWidth rows={10} value={stringMorph.decoded} onChange={(e) => {
						let cont: StringMorph = {
							decoded: e.target.value,
							encoded: ConvertTo(e.target.value)
						}
						setStringMorph(cont);
					}} />
				</Grid>
				<Grid item xs={2} sm={4} md={4}>
					<TextField id="decode" label="Decode" multiline fullWidth rows={10} value={stringMorph.encoded} onChange={(e) => {
						let cont: StringMorph = {
							decoded: ConvertFrom(e.target.value),
							encoded: e.target.value
						}
						setStringMorph(cont);
					}} />
				</Grid>
			</Grid>
		</Box>
		</>
	);
}
