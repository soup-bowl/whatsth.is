import React from 'react';
import { createRoot } from 'react-dom/client';
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

const container = document.getElementById('root');
const root = createRoot(container!);
root.render( <React.StrictMode><App /></React.StrictMode> );

