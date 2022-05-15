import { Box, FormControl, Grid, InputLabel, TextField, Typography,
	MenuItem, Select, SelectChangeEvent, ListSubheader, Link } from "@mui/material";
import { AES, TripleDES, enc } from 'crypto-js';
import { useState } from "react";

interface StringMorph {
	decoded: string;
	encoded: string;
}

enum ConversionType {
	Base64 = 0,
	Hex = 1,
	URI = 2,
	AES = 10,
	TDES = 11,
}

export default function StringConversionPage() {
	const [stringMorph, setStringMorph] = useState<StringMorph>({encoded: '', decoded: ''});
	const [passphrase, setPassphrase] = useState('');
	const [type, setType] = useState<ConversionType>(ConversionType.Base64);

	const handleTypeChange = (event: SelectChangeEvent) => {
		setType(parseInt(event.target.value));
		setStringMorph({encoded: '', decoded: ''});
	};

	const handleChangePassphrase = (e:any) => {
		setPassphrase(e.target.value);
		setStringMorph({encoded: '', decoded: ''});
	};

	function ConvertTo(thing:string, phrase:string = '') {
		switch (type) {
			case ConversionType.Base64:
				return btoa(thing);
			case ConversionType.Hex:
				// https://stackoverflow.com/a/60435654
				return thing.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
			case ConversionType.URI:
				return encodeURIComponent(thing);
			case ConversionType.AES:
				return AES.encrypt(thing, phrase).toString();
			case ConversionType.TDES:
				return TripleDES.encrypt(thing, phrase).toString();
			default:
				return thing;
		}
	}

	function ConvertFrom(thing:string, phrase:string = '') {
		switch (type) {
			case ConversionType.Base64:
				return atob(thing);
			case ConversionType.Hex:
				// https://stackoverflow.com/a/60435654
				return thing.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("")
			case ConversionType.URI:
				return decodeURIComponent(thing);
			case ConversionType.AES:
				return AES.decrypt(thing, phrase).toString(enc.Utf8);
			case ConversionType.TDES:
				return TripleDES.decrypt(thing, phrase).toString(enc.Utf8);
			default:
				return thing;
		}
	}

	return(
		<>
		<Typography variant="h3" component="h1" my={2}>String Conversions</Typography>
		<Typography my={2}>This segment is powered by the <Link href="https://www.npmjs.com/package/crypto-js">CryptoJS library</Link>.</Typography>
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
							<MenuItem value={2}>URI</MenuItem>
							<ListSubheader>Encrypt</ListSubheader>
							<MenuItem value={10}>AES</MenuItem>
							<MenuItem value={11}>3DES</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item>
					<FormControl variant="filled" sx={{ m: 1, minWidth: 360 }}>
						<TextField
							id="passphrase"
							label="Passphrase (for encryption)"
							variant="filled"
							onChange={handleChangePassphrase}
							disabled={(parseInt(type.toString()) >= 10) ? false : true}
						/>
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
							encoded: ConvertTo(e.target.value, passphrase)
						}
						setStringMorph(cont);
					}} />
				</Grid>
				<Grid item xs={2} sm={4} md={4}>
					<TextField id="decode" label="Decode" multiline fullWidth rows={10} value={stringMorph.encoded} onChange={(e) => {
						let cont: StringMorph = {
							decoded: ConvertFrom(e.target.value, passphrase),
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
