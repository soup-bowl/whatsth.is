import { Box, Button, Container, CssBaseline, Paper, Stack, ThemeProvider, Typography } from "@mui/material"
import { CSSProperties, Component, ErrorInfo } from "react"
import theme from "./theme/theme"

interface ErrorProp {
	children: JSX.Element
}

interface StateProp {
	hasError: boolean
	errorName?: string
	errorMessage?: string
	errorStack?: string
}

const errorBox: CSSProperties = {
	fontFamily: "monospace",
	backgroundColor: "#404040",
	color: "#fff",
	borderRadius: "1em",
	maxWidth: "75%",
	padding: "1em",
	margin: "0 auto",
	textAlign: "left",
}

export class ErrorBoundary extends Component<ErrorProp, StateProp> {
	constructor(props: ErrorProp) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log(errorInfo.componentStack)
		this.setState({
			errorName: error.name,
			errorMessage: error.message,
			errorStack: errorInfo.componentStack ?? "",
		})
	}

	render() {
		if (this.state.hasError) {
			const message = encodeURIComponent(
				`
			I have:

			- [ ]  Cleared my cache.

			The following are relevant to my situation:

			- [ ] I was on Desktop.
			- [ ] I was on Mobile.
			- [ ] I have installed the app in my browser (mention below).

			**What browser are you using?**
			(If installed, it'll still link to the browser you installed with).

			**If you got an output, Paste the Stack Trace inbetween the marks below**
			\`\`\`
			[${this.state.errorName}] ${this.state.errorMessage}
			URL: ${window.location.href}
			Verison: ${process.env.REACT_APP_VERSION}
			Agent: ${window.navigator.userAgent}

			${this.state.errorStack}
			\`\`\`
			`.replace(/\t/g, "")
			)
			const title = `[${this.state.errorName}] ${this.state.errorMessage}`.split(" ").join("+")
			const url = `https://github.com/soup-bowl/whatsth.is/issues/new?assignees=soup-bowl&labels=bug&body=${message}&title=${title}`

			return (
				<ThemeProvider theme={theme}>
					<Box sx={{ display: "flex", paddingBottom: 4 }} textAlign="center">
						<CssBaseline />
						<Container maxWidth="lg">
							<Typography sx={{ fontSize: "8em" }}>:(</Typography>
							<Typography variant="h3" component="h1" my={2}>
								A Crash has Occurred
							</Typography>
							<Typography my={2}>We apologise for the inconvinience. Click the button below to return.</Typography>
							<Stack my={2} spacing={2} direction="row" justifyContent="center">
								<Button variant="contained" onClick={() => window.location.reload()}>
									Reload
								</Button>
								<Button variant="outlined" color="error" onClick={() => window.open(url, "_blank")}>
									Report
								</Button>
							</Stack>
							<Typography variant="h4" component="h2" my={2}>
								Technical Details
							</Typography>
							<Paper elevation={3} sx={errorBox}>
								<Typography fontWeight="700">
									[{this.state.errorName}] {this.state.errorMessage}
								</Typography>
								<Typography>
									URL: {window.location.href}; Verison: {process.env.REACT_APP_VERSION}; Agent:{" "}
									{window.navigator.userAgent}
								</Typography>
								<pre style={{ overflowX: "auto" }}>{this.state.errorStack}</pre>
							</Paper>
						</Container>
					</Box>
				</ThemeProvider>
			)
		}

		return this.props.children
	}
}
