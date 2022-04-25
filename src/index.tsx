import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from "./pages/_layout";
import Home from './pages/home';
import { InspectionHome, InspectonResult } from "./pages/inspection";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout/>}>
					<Route index element={<Home/>} />
					<Route path="inspect" element={<InspectionHome/>} />
					<Route path="inspect/*" element={<InspectonResult/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

ReactDOM.render( <React.StrictMode><App /></React.StrictMode>, document.getElementById('root') );
