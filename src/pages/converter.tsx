import { Box, FormControl, Grid, InputLabel, TextField, Typography,
	MenuItem, Select, SelectChangeEvent, ListSubheader, Link } from "@mui/material";
import { AES, TripleDES, enc } from 'crypto-js';
import { useEffect, useState } from "react";
import { ConversionType } from "../enums";
import { IStringMorph } from "../interfaces";

const siteTitle = "String Conversions";

export default function StringConversionPage() {
	const [stringMorph, setStringMorph] = useState<IStringMorph>({encoded: '', decoded: ''});
	const [passphrase, setPassphrase] = useState('');
	const [type, setType] = useState<ConversionType>(ConversionType.Base64);

	useEffect(() => { document.title = `${siteTitle} - What's This?` });

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
		<Typography variant="h1" my={2}>{siteTitle}</Typography>
		<Typography>
			Converts text from and into various forms of encoding and encryption methods. The encryption segment is
			powered by the <Link href="https://www.npmjs.com/package/crypto-js">CryptoJS library</Link>.
		</Typography>
		<Box sx={{ flexGrow: 1, marginBottom: 2 }}>
			<Grid container spacing={2} marginTop={2}>
				<Grid item xs={12} sm={4}>
					<FormControl fullWidth>
						<InputLabel id="chooseConversionType">Conversion Type</InputLabel>
						<Select fullWidth
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
				<Grid item xs={12} sm={8} display={(parseInt(type.toString()) >= 10) ? 'inherit' : 'none'}>
					<FormControl fullWidth>
						<TextField fullWidth
							id="passphrase"
							label="Encryption Password (optional)"
							onChange={handleChangePassphrase}
						/>
					</FormControl>
				</Grid>
			</Grid>
		</Box>
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField id="encode" label="Encode" multiline fullWidth rows={15} value={stringMorph.decoded} onChange={(e) => {
						setStringMorph({
							decoded: e.target.value,
							encoded: ConvertTo(e.target.value, passphrase)
						});
					}} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField id="decode" label="Decode" multiline fullWidth rows={15} value={stringMorph.encoded} onChange={(e) => {
						setStringMorph({
							decoded: ConvertFrom(e.target.value, passphrase),
							encoded: e.target.value
						});
					}} />
				</Grid>
			</Grid>
		</Box>
		</>
	);
}
