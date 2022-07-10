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

const buttonStyle:CSSProperties = {
	backgroundColor: '#9c27b0',
	border: 'none',
	borderRadius: '1em',
	padding: '1em',
	color: '#fff',
}

const errorBox:CSSProperties = {
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
			return (
				<div style={mainStyle}>
					<p style={{fontSize: '8em', margin: 0}}>:(</p>
					<h1>A crash has occurred</h1>
					<p>We apologise for the inconvinience. Click the button below to return.</p>
					<button style={buttonStyle} onClick={() => (window.location.reload())}>Reload</button>
					<h2>Technical Details</h2>
					<div style={errorBox}>
						<p><strong>[{this.state.errorName}] {this.state.errorMessage}</strong></p>
						<pre style={{overflowX: 'auto'}}>{this.state.errorStack}</pre>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
