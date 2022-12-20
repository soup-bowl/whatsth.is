import { Box, Button, Container, CssBaseline, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import { CSSProperties, Component } from "react";
import theme from "./theme/theme";

interface ErrorProp {
	children: any;
}

interface StateProp {
	hasError: boolean;
	errorName?: string;
	errorMessage?: string;
	errorStack?: string;
}

const errorBox: CSSProperties = {
	fontFamily: 'monospace',
	backgroundColor: '#404040',
	color: '#fff',
	borderRadius: '1em',
	maxWidth: '75%',
	padding: '1em',
	margin: '0 auto',
	textAlign: 'left',
}

export class ErrorBoundary extends Component<ErrorProp, StateProp> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.log(errorInfo.componentStack);
		this.setState({
			errorName: error.name,
			errorMessage: error.message,
			errorStack: errorInfo.componentStack
		});
	}

	render() {
		if (this.state.hasError) {
			let title = `[${this.state.errorName}] ${this.state.errorMessage}`.split(' ').join('+');
			let url = `https://github.com/soup-bowl/whatsth.is/issues/new?assignees=soup-bowl&labels=bug&template=crash_report.md&title=${title}`;

			return (
				<ThemeProvider theme={theme}>
					<Box sx={{ display: 'flex', paddingBottom: 4 }} textAlign="center">
						<CssBaseline />
						<Container maxWidth="lg">
							<Typography sx={{ fontSize: '8em' }}>:(</Typography>
							<Typography variant="h3" component="h1" my={2}>A Crash has Occurred</Typography>
							<Typography my={2}>We apologise for the inconvinience. Click the button below to return.</Typography>
							<Stack my={2} spacing={2} direction="row" justifyContent="center">
								<Button variant="contained" onClick={() => (window.location.reload())}>Reload</Button>
								<Button variant="outlined" color="error" onClick={() => (window.open(url, '_blank'))}>Report</Button>
							</Stack>
							<Typography variant="h4" component="h2" my={2}>Technical Details</Typography>
							<Paper elevation={3} sx={errorBox}>
								<Typography fontWeight='700'>[{this.state.errorName}] {this.state.errorMessage}</Typography>
								<Typography>URL: {window.location.href}; Verison: {process.env.REACT_APP_VERSION}; Agent: {window.navigator.userAgent}</Typography>
								<pre style={{ overflowX: 'auto' }}>{this.state.errorStack}</pre>
							</Paper>
						</Container>
					</Box>
				</ThemeProvider>
			);
		}

		return this.props.children;
	}
}
