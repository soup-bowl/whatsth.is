import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from "./theme/layout";
import { ErrorBoundary } from "./error";
import {
	Home, AboutPage, CronConversionPage, DomainToolsHome, HelpPage, InspectionHome,
	InspectonResultDisplay, StringConversionPage, UnixEpochPage, ColourPickerPage
} from './pages';
import { APIContext, ConnectionContext } from './context';
import { APIAgentType, Agent } from 'libwhatsthis';

const App = () => {
	const [connectionState, setConnectionState] = useState(navigator.onLine);
	
	const apiAgent: APIAgentType = new Agent(import.meta.env.VITE_API_URL);

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
			<APIContext.Provider value={{ apiAgent }}>
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
								<Route path="colour" element={<ColourPickerPage />} />
								<Route path="colour/*" element={<ColourPickerPage />} />
								<Route path="color" element={<Navigate replace to="/colour" />} />
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
			</APIContext.Provider>
		</ErrorBoundary>
	);
}

export default App;
