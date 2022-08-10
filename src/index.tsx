import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Layout from "./pages/_layout";
import Home from './pages/home';
import { HelpPage, AboutPage } from './pages/help';
import { InspectionHome, InspectonResult } from "./pages/inspection";
import DnsCheckHome from './pages/dnschecker';
import StringConversionPage from './pages/converter';
import { CronConversionPage } from './pages/cron';
import UnixEpochPage from './pages/time';
import { ErrorBoundary } from "./error";

export default function App() {
	// https://stackoverflow.com/a/65049865
	const [connectionState, setConnectionState] = useState((navigator.onLine) ? true : false);
	useEffect(() => {
		const interval = setInterval(() => {
			if (navigator.onLine) {
				setConnectionState(true);
			} else {
				setConnectionState(false);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<ErrorBoundary>
			<HashRouter>
				<Routes>
					<Route path="/" element={<Layout online={connectionState} />}>
						<Route index element={<Home online={connectionState} />} />
						<Route path="help"      element={<HelpPage />} />
						<Route path="about"     element={<AboutPage />} />
						<Route path="inspect"   element={<InspectionHome online={connectionState} />} />
						<Route path="inspect/*" element={<InspectonResult />} />
						<Route path="dns/*"     element={<DnsCheckHome online={connectionState} />} />
						<Route path="cron"      element={<CronConversionPage />} />
						<Route path="cron/*"    element={<CronConversionPage />} />
						<Route path="time"      element={<UnixEpochPage />} />
						<Route path="time/*"    element={<UnixEpochPage />} />
						<Route path="convert"   element={<StringConversionPage />} />
						<Route path="encoder"   element={<Navigate replace to="/convert" />} />
						<Route path="decoder"   element={<Navigate replace to="/convert" />} />
						<Route path="unix"      element={<Navigate replace to="/time" />} />
						<Route path="*"         element={<Navigate replace to="/" />} />
					</Route>
				</Routes>
			</HashRouter>
		</ErrorBoundary>
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
serviceWorkerRegistration.register({
	onUpdate: (registration: ServiceWorkerRegistration) => {
		if (registration && registration.waiting) {
			registration.waiting.postMessage({ type: 'SKIP_WAITING' });
		}

		window.location.reload();
	}
});
