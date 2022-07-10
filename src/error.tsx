import { CSSProperties, Component } from "react";

interface ErrorProp {
	children: any;
}

interface StateProp {
	hasError: boolean;
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
	color: '#fff'
}

const buttonStyle:CSSProperties = {
	backgroundColor: '#9c27b0',
	border: 'none',
	borderRadius: '1em',
	padding: '1em',
	color: '#fff'
}

export class ErrorBoundary extends Component<ErrorProp, StateProp> {
	constructor(props:any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error:any) {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={mainStyle}>
					<p style={{fontSize: '8em', margin: 0}}>:(</p>
					<h1>A crash has occurred</h1>
					<p>We apologise for the inconvinience. Click the button below to return.</p>
					<button style={buttonStyle} onClick={() => (window.location.reload())}>Reload</button>
				</div>
			);
		}

		return this.props.children;
	}
}
