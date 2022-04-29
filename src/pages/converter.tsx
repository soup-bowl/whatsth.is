import { Box, FormControl, Grid, InputLabel, TextField, Typography, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface StringMorph {
	decoded: string;
	encoded: string;
}

enum ConversionType {
	Base64,
}

export default function StringConversionPage() {
	const [stringMorph, setStringMorph] = useState<StringMorph>({encoded: '', decoded: ''});
	const [type, setType] = useState<ConversionType>(ConversionType.Base64);

	const handleTypeChange = (event: SelectChangeEvent) => {
		setType(parseInt(event.target.value));
	};

	function ConvertTo(thing:string) {
		switch (type) {
			case ConversionType.Base64:
				return btoa(thing);
			default:
				return thing;
		}
	}
	
	function ConvertFrom(thing:string) {
		switch (type) {
			case ConversionType.Base64:
				return atob(thing);
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
						value={ConversionType.Base64.toString()}
						onChange={handleTypeChange}
						>
							<MenuItem value={0}>Base64</MenuItem>
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
