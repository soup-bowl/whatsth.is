import { createContext, StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import Layout from "./theme/layout";
import { ErrorBoundary } from "./error";
import {
	Home, AboutPage, CronConversionPage, DomainToolsHome, HelpPage, InspectionHome,
	InspectonResultDisplay, StringConversionPage, UnixEpochPage
} from './pages';

type ConnectionContextType = {
	connectionState: boolean;
};

export const ConnectionContext = createContext<ConnectionContextType>({
	connectionState: false,
});

export function App() {
	const [connectionState, setConnectionState] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => setConnectionState(true);
		const handleOffline = () => setConnectionState(false);

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	return (
		<ErrorBoundary>
			<ConnectionContext.Provider value={{ connectionState }}>
				<HashRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="help" element={<HelpPage />} />
							<Route path="about" element={<AboutPage />} />
							<Route path="inspect" element={<InspectionHome />} />
							<Route path="inspect/*" element={<InspectonResultDisplay />} />
							<Route path="domain/*" element={<DomainToolsHome />} />
							<Route path="cron" element={<CronConversionPage />} />
							<Route path="cron/*" element={<CronConversionPage />} />
							<Route path="time" element={<UnixEpochPage />} />
							<Route path="time/*" element={<UnixEpochPage />} />
							<Route path="convert" element={<StringConversionPage />} />
							<Route path="encoder" element={<Navigate replace to="/convert" />} />
							<Route path="decoder" element={<Navigate replace to="/convert" />} />
							<Route path="unix" element={<Navigate replace to="/time" />} />
							<Route path="dns/*" element={<Navigate replace to="/domain" />} />
							<Route path="*" element={<Navigate replace to="/" />} />
						</Route>
					</Routes>
				</HashRouter>
			</ConnectionContext.Provider>
		</ErrorBoundary>
	);
}

const container = document.getElementById('root');
const root = createRoot(container!);

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
