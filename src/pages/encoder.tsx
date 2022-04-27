import { Box, Grid, TextField, Typography } from "@mui/material";

export default function EncoderPage() {
	return(
		<>
		<Typography variant="h3" component="h1" my={2}>Encode / Decode</Typography>
		<Typography my={2}>Encodes and decodes in Base64.</Typography>
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} columns={{ xs: 2, sm: 8}}>
				<Grid item xs={2} sm={4} md={4}>
					<TextField id="encode" label="Encode" multiline fullWidth rows={10} />
				</Grid>
				<Grid item xs={2} sm={4} md={4}>
					<TextField id="decode" label="Decode" multiline fullWidth rows={10} />
				</Grid>
			</Grid>
		</Box>
		</>
	);
}
