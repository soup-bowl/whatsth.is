import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from "./theme/layout";
import { ErrorBoundary } from "./error";
import {
	Home, AboutPage, CronConversionPage, DomainToolsHome, HelpPage, InspectionHome,
	InspectonResultDisplay, StringConversionPage, UnixEpochPage, ColourPickerPage, ScratchpadPage, OptionsPage
} from './pages';
import { APIContext, ConnectionContext } from './context';
import { APIAgentType, Agent } from 'libwhatsthis';
import { SnackbarProvider } from 'notistack';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';

const App = () => {
	const [connectionState, setConnectionState] = useState(navigator.onLine);
	const [mode, setMode] = useState<string>(localStorage.getItem('ColourPref') ?? 'dark');

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

	const theme = useMemo(() => createTheme({
		palette: {
			primary: purple,
			mode: mode as PaletteMode
		},
		typography: {
			button: {
				textTransform: 'none'
			},
			h1: {
				fontSize: '3.25rem'
			},
			h2: {
				fontSize: '2.75rem'
			},
			h3: {
				fontSize: '2rem'
			}
		}
	}), [mode]);

	return (
		<ErrorBoundary>
			<APIContext.Provider value={{ apiAgent }}>
				<ConnectionContext.Provider value={{ connectionState }}>
					<SnackbarProvider maxSnack={3}>
						<ThemeProvider theme={theme}>
							<HashRouter>
								<Routes>
									<Route path="/" element={<Layout theme={theme} mode={mode} setMode={setMode} />}>
										<Route index element={<Home />} />
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
										<Route path="scratchpad" element={<ScratchpadPage />} />
										<Route path="convert" element={<StringConversionPage />} />
										<Route path="encoder" element={<Navigate replace to="/convert" />} />
										<Route path="decoder" element={<Navigate replace to="/convert" />} />
										<Route path="unix" element={<Navigate replace to="/time" />} />
										<Route path="dns/*" element={<Navigate replace to="/domain" />} />
										<Route path="*" element={<Navigate replace to="/" />} />
									</Route>
								</Routes>
							</HashRouter>
						</ThemeProvider>
					</SnackbarProvider>
				</ConnectionContext.Provider>
			</APIContext.Provider>
		</ErrorBoundary>
	);
}

export default App;
