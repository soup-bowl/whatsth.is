import { Box, Button, Stack, Typography } from "@mui/material";
import { CSSProperties, Component } from "react";

interface ErrorProp {
	children: any;
}

interface StateProp {
	hasError: boolean;
	errorName?: string;
	errorMessage?: string;
	errorStack?: string;
}

const mainStyle:CSSProperties = {
	fontFamily: 'sans-serif',
	textAlign: 'center',
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: '#121212',
	color: '#fff',
}

const errorBox:CSSProperties = {
	fontFamily: 'monospace',
	backgroundColor: '#404040',
	borderRadius: '1em',
    maxWidth: '75%',
	padding: '1em',
    margin: '0 auto',
	textAlign: 'left',
}

export class ErrorBoundary extends Component<ErrorProp, StateProp> {
	constructor(props:any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error:any, errorInfo:any) {
		console.log(errorInfo.componentStack);
		this.setState({
			errorName: error.name,
			errorMessage: error.message,
			errorStack: errorInfo.componentStack
		});
	}

	render() {
		if (this.state.hasError) {
			let title = `[${this.state.errorName}] ${this.state.errorMessage}`.replaceAll(' ', '+');
			let url = `https://github.com/soup-bowl/whatsth.is/issues/new?assignees=soup-bowl&labels=bug&template=crash_report.md&title=${title}`;

			return (
				<Box style={mainStyle}>
					<Typography sx={{fontSize: '8em', margin: 0, transform: 'rotate(90deg)'}}>:(</Typography>
					<Typography variant="h3" component="h1" my={2}>A Crash has Occurred</Typography>
					<Typography my={2}>We apologise for the inconvinience. Click the button below to return.</Typography>
					<Stack my={2} spacing={2} direction="row" justifyContent="center">
						<Button variant="contained" onClick={() => (window.location.reload())}>Reload</Button>
						<Button variant="outlined" color="error" onClick={() => (window.open(url, '_blank'))}>Report</Button>
					</Stack>
					<Typography variant="h4" component="h2" my={2}>Technical Details</Typography>
					<Box style={errorBox}>
						<Typography>[{this.state.errorName}] {this.state.errorMessage}</Typography>
						<pre style={{overflowX: 'auto'}}>{this.state.errorStack}</pre>
					</Box>
				</Box>
			);
		}

		return this.props.children;
	}
}
