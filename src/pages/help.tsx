import { Typography, Link, Box, Button, Stack, Chip, Tooltip, IconButton, styled } from "@mui/material"
import { useState, useEffect, useContext } from "react"
import { WhatsThisLogo } from "../components"
import { IStorage } from "../interfaces"
import { ConnectionContext, useAPIContext } from "../context"
import { formatBytes } from "libwhatsthis"
import { DataGrid } from "@mui/x-data-grid"

import FileCopyIcon from "@mui/icons-material/FileCopy"
import GitHubIcon from "@mui/icons-material/GitHub"
import CachedIcon from "@mui/icons-material/Cached"
import CloudOffIcon from "@mui/icons-material/CloudOff"

const WalletDisplay = styled(Typography)({
	fontFamily: "monospace",
	color: "#ffffff",
	backgroundColor: "#121212",
	padding: 2,
	borderRadius: 5,
	borderStyle: "solid",
	borderWidth: 1,
	borderColor: "#515151",
})

export const HelpPage = () => {
	const siteTitle = "Help"

	useEffect(() => {
		document.title = `${siteTitle} - What's This?`
	})

	return (
		<>
			<Typography variant="h1" my={2}>
				What's "What's This?"?
			</Typography>
			<Typography my={2}>
				What's This is a <Link href="https://labs.soupbowl.io">Soupbowl Labs</Link> experiment to create a{" "}
				<Link href="https://web.dev/progressive-web-apps/">Progressive Web App</Link> programmer/tinkerer's toolbox.
				Features added are things that have been helpful in the IT sector.
			</Typography>
			<Typography variant="h2" my={2}>
				Progressive Web Application
			</Typography>
			<Typography my={2}>
				<Link href="https://web.dev/progressive-web-apps/">Progressive Web Apps</Link> (PWA) is an emerging technology
				to provide a way of distributing apps in an easier and quicker way. PWA functions essentially like a website,
				but instead of each request checking and reloading resources, the PWA operates with the resources it has
				obtained. This means <strong>you can go offline</strong>, and the app will continue to work.
			</Typography>
			<Typography variant="h3" my={2}>
				Installing the PWA
			</Typography>
			<Typography my={2}>
				Installing is an <strong>optional feature</strong>, as by simplying <em>visiting</em> the site will initiate the
				PWA. However, some browsers and operating systems will integrate the 'app' into the system (works better on
				mobile than on desktop).
			</Typography>
			<Typography my={2}>
				Below are some common devices, but there is&nbsp;
				<Link href="https://github.com/soup-bowl/whatsth.is/wiki/Supported-Devices">
					also a page on the wiki about more supported devices
				</Link>
				.
			</Typography>
			<Typography variant="h4" my={2}>
				iPhone / iPad
			</Typography>
			<Typography my={2}>
				Open this website in Safari, and click on the share icon (square with an arrow pointing up). Click on the option
				'Add to Home Screen', and then click 'Add'. The web app will now be installed, and can be uninstalled via
				regular means.
			</Typography>
			<Typography variant="h4" my={2}>
				Android
			</Typography>
			<Typography my={2}>
				This can be different depending on device and browser. Following instructions are for <strong>Chrome</strong>,
				but PWA can be installed via all mainstream Android web browsers such as Firefox & Brave.
			</Typography>
			<Typography my={2}>
				Open this website in Chrome. Click on the hamburger/dots menu, and click 'Add to Home Screen', and then click
				'Add'. Most Android variants will highlight PWAs with the icon of the browser technology they run in.
			</Typography>
			<Typography variant="h2" my={2}>
				What does <Chip label="Beta" color="info" /> mean?
			</Typography>
			<Typography my={2}>
				This represents a segment that has not yet been fully completed. All segments will continue to be worked on for
				as long as they can have stuff added or fixed, but the marked ones require more attention. Expect bugs when
				dealing with beta-marked entries, but please{" "}
				<Link href="https://github.com/soup-bowl/whatsth.is/issues">report them where possible</Link>.
			</Typography>
		</>
	)
}

interface ErrorCatch {
	code?: string
	message?: string
}

export const AboutPage = () => {
	const siteTitle = "About"
	const { connectionState } = useContext(ConnectionContext)
	const { apiAgent } = useAPIContext()

	const [apiVersion, setApiVersion] = useState<string | React.ReactNode>("")
	const [storageInfo, setStorageInfo] = useState<IStorage>({} as IStorage)

	const wallets = [
		{ key: "btc", wallet: "3CFhcK1mazPDEiX8FLEhEQhQ9ARYFMCkqf" },
		{ key: "eth", wallet: "0x74C34F52593aF941BEea187203153Ec065321001" },
	]

	useEffect(() => {
		document.title = `${siteTitle} - What's This?`
	})

	useEffect(() => {
		if (connectionState) {
			apiAgent.Details.openapi()
				.then((response) => {
					setApiVersion(response.info.version)
				})
				.catch((err: ErrorCatch) => {
					setApiVersion(
						<Tooltip title={`(${err.code ?? "N/A"}) ${err.message ?? "N/A"}`}>
							<span>Comms Error</span>
						</Tooltip>
					)
				})
		} else {
			setApiVersion(
				<>
					<CloudOffIcon fontSize="inherit" /> Offline
				</>
			)
		}
	}, [connectionState, apiAgent])

	useEffect(() => {
		if ("storage" in navigator && "estimate" in navigator.storage) {
			navigator.storage.estimate().then(({ usage, quota }) => {
				setStorageInfo({ usage: usage ?? 0, quota: quota ?? 0 })
			})
		}
	}, [])

	return (
		<Box textAlign="center">
			<WhatsThisLogo />
			<Typography variant="h1" my={2}>
				What's This?
			</Typography>
			<Typography my={2}>
				Developed by{" "}
				<Link style={{ fontWeight: "bold" }} href="https://soupbowl.io">
					soup-bowl
				</Link>{" "}
				and hosted on{" "}
				<Link style={{ fontWeight: "bold" }} href="https://pages.cloudflare.com/">
					Cloudflare Pages
				</Link>
				.
			</Typography>
			<Stack my={2}>
				<Typography>
					App Version:{" "}
					<Box component="span" fontWeight="700">
						{__APP_VERSION__}
					</Box>
				</Typography>
				<Typography>
					Library Version:{" "}
					<Box component="span" fontWeight="700">
						{__LIB_VERSION__.replace("^", "")}
					</Box>
				</Typography>
				<Typography>
					API Version:{" "}
					<Box component="span" fontWeight="700">
						{apiVersion}
					</Box>
				</Typography>

				{storageInfo.quota !== undefined && storageInfo.quota !== 0 ? (
					<Typography>
						Using{" "}
						<Box component="span" fontWeight="700">
							{formatBytes(storageInfo.usage)}
						</Box>{" "}
						of&nbsp;
						<Box component="span" fontWeight="700">
							{formatBytes(storageInfo.quota)}
						</Box>{" "}
						available local storage.
					</Typography>
				) : (
					<Typography color="darkgrey">Storage API is not supported.</Typography>
				)}
			</Stack>
			<Stack my={2} spacing={2} direction="row" justifyContent="center">
				<Button onClick={() => window.location.reload()} variant="contained" color="error" startIcon={<CachedIcon />}>
					Reload
				</Button>
				<Button href="https://github.com/soup-bowl/whatsth.is" variant="contained" startIcon={<GitHubIcon />}>
					Source Code
				</Button>
			</Stack>
			<Typography variant="h1" my={2}>
				Donate
			</Typography>
			<Typography my={2}>
				<Link href="https://www.buymeacoffee.com/soupbowl">
					<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" />
				</Link>
			</Typography>
			{wallets.map((wallet) => (
				<Box key={wallet.key}>
					<Typography variant="h3" sx={{ marginTop: 2 }}>
						{wallet.key.toUpperCase()} Address
					</Typography>
					<Stack direction="row" justifyContent="center" alignItems="center">
						<WalletDisplay>{wallet.wallet}</WalletDisplay>
						<IconButton
							onClick={() => {
								navigator.clipboard.writeText(wallet.wallet)
							}}
						>
							<FileCopyIcon />
						</IconButton>
					</Stack>
				</Box>
			))}
			<Typography variant="h2" my={2}>
				Credit
			</Typography>
			<Box sx={{ height: 400, width: "100%" }}>
				<DataGrid
					columns={[
						{ field: "package", headerName: "Package", flex: 0.6 },
						{
							field: "maintainer",
							headerName: "Author/Owner",
							flex: 1.4,
							renderCell(params) {
								return <Link href={params.row.maintainer}>{params.row.maintainer}</Link>
							},
						},
					]}
					rows={[
						{ id: 0, package: "CryptoJS", maintainer: "https://www.npmjs.com/package/crypto-js" },
						{ id: 1, package: "cRontrue", maintainer: "https://www.npmjs.com/package/cronstrue" },
						{ id: 2, package: "DnsClient.NET", maintainer: "https://dnsclient.michaco.net/" },
						{ id: 3, package: "ua-parser-js", maintainer: "https://github.com/faisalman/ua-parser-js" },
						{ id: 4, package: "ident.me", maintainer: "https://api.ident.me/" },
						{ id: 5, package: "ipinfo.io", maintainer: "https://ipinfo.io/" },
					]}
					disableColumnMenu
					disableColumnSelector
					hideFooter
				/>
			</Box>
		</Box>
	)
}
