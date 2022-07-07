import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Layout from "./pages/_layout";
import Home from './pages/home';
import { HelpPage, AboutPage } from './pages/help';
import { InspectionHome, InspectonResult } from "./pages/inspection";
import { DnsCheckHome, DnsCheckResult } from './pages/dnschecker';
import StringConversionPage from './pages/converter';
import { CronConversionPage } from './pages/cron';

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="help"      element={<HelpPage />} />
					<Route path="about"     element={<AboutPage />} />
					<Route path="inspect"   element={<InspectionHome />} />
					<Route path="inspect/*" element={<InspectonResult />} />
					<Route path="dns"       element={<DnsCheckHome />} />
					<Route path="dns/*"     element={<DnsCheckResult />} />
					<Route path="cron"      element={<CronConversionPage />} />
					<Route path="convert"   element={<StringConversionPage />} />
					<Route path="encoder"   element={<Navigate replace to="/convert" />} />
					<Route path="decoder"   element={<Navigate replace to="/convert" />} />
					<Route path="*"         element={<Navigate replace to="/" />} />
				</Route>
			</Routes>
		</HashRouter>
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
	onUpdate: () => {window.location.reload()}
});
