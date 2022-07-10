import React from "react";

interface ErrorProp {
	children: any;
}

interface StateProp {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorProp, StateProp> {
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
				<div style={{fontFamily: 'sans-serif', textAlign: 'center'}}>
					<p style={{fontSize: '8em', margin: 0}}>:(</p>
					<h1>A crash has occurred</h1>
					<p>We apologise for the inconvinience. Click the button below to return.</p>
					<button onClick={() => (window.location.reload())}>Reload</button>
				</div>
			);
		}

		return this.props.children;
	}
}
