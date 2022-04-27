import { Box, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface StringMorph {
	decoded: string;
	encoded: string;
}

export default function EncoderPage() {
	const [stringMorph, setStringMorph] = useState<StringMorph>({encoded: '', decoded: ''});

	return(
		<>
		<Typography variant="h3" component="h1" my={2}>Encode / Decode</Typography>
		<Typography my={2}>Encodes and decodes in Base64.</Typography>
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} columns={{ xs: 2, sm: 8}}>
				<Grid item xs={2} sm={4} md={4}>
					<TextField id="decode" label="Decode" multiline fullWidth rows={10} value={stringMorph.decoded} onChange={(e) => {
						let cont: StringMorph = {
							decoded: e.target.value,
							encoded: btoa(e.target.value)
						}
						setStringMorph(cont);
					}} />
				</Grid>
				<Grid item xs={2} sm={4} md={4}>
					<TextField id="encode" label="Encode" multiline fullWidth rows={10} value={stringMorph.encoded} onChange={(e) => {
						let cont: StringMorph = {
							decoded: atob(e.target.value),
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
