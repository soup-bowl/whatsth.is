import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

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
const root      = createRoot(container!);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
