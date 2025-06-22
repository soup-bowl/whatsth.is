import { useEffect, useState } from "react"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"

import Layout from "./theme/layout"
import { ErrorBoundary } from "./error"
import {
	Home,
	AboutPage,
	CronConversionPage,
	HelpPage,
	StringConversionPage,
	UnixEpochPage,
	ColourPickerPage,
	ScratchpadPage,
} from "./pages"
import { ConnectionContext } from "./context"
import { APIAgentType, Agent } from "./lib"
import { SnackbarProvider } from "notistack"

const App = () => {
	const [connectionState, setConnectionState] = useState(navigator.onLine)

	const apiAgent: APIAgentType = new Agent(import.meta.env.VITE_API_URL)

	useEffect(() => {
		const handleOnline = () => setConnectionState(true)
		const handleOffline = () => setConnectionState(false)

		window.addEventListener("online", handleOnline)
		window.addEventListener("offline", handleOffline)

		return () => {
			window.removeEventListener("online", handleOnline)
			window.removeEventListener("offline", handleOffline)
		}
	}, [])

	return (
		<ErrorBoundary>
			<ConnectionContext.Provider value={{ connectionState }}>
				<SnackbarProvider maxSnack={3}>
					<HashRouter>
						<Routes>
							<Route path="/" element={<Layout />}>
								<Route index element={<Home />} />
								<Route path="help" element={<HelpPage />} />
								<Route path="about" element={<AboutPage />} />
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
				</SnackbarProvider>
			</ConnectionContext.Provider>
		</ErrorBoundary>
	)
}

export default App
