import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from "./pages/_layout";
import Home from "./pages/home";
import Inspector from "./pages/inspector";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout/>}>
					<Route index element={<Home/>} />
					<Route path="url/*" element={<Inspector/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

ReactDOM.render( <React.StrictMode><App /></React.StrictMode>, document.getElementById('root') );
