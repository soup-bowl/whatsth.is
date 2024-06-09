import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import {
	Button,
	TextField,
	Grid,
	Typography,
	CircularProgress,
	Box,
	Alert,
	AlertTitle,
	Stack,
	Link,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DetailCard, ReportInspectionError, SaveScratchButton } from "../components"
import { UserAgentModel } from "../modals"
import { ConnectionContext, useAPIContext } from "../context"
import { IInspectionDetails } from "libwhatsthis"

const siteTitle = "Site Inspector"

export const InspectionHome = () => {
	const { connectionState } = useContext(ConnectionContext)
	const [inputURL, setInputURL] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		document.title = `${siteTitle} - What's This?`
	})

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		return navigate("/inspect/" + inputURL)
	}

	const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
		setInputURL(e.target.value)
	}

	return (
		<>
			<Typography variant="h1" my={2}>
				{siteTitle}
			</Typography>
			<Typography my={2}>We will try to pick details out of the URL you specify.</Typography>
			<Box my={2}>
				<Alert severity="info">
					<AlertTitle>Beta</AlertTitle>
					This is a <strong>beta</strong> service. Please use the feedback forms to let us know what is missing!
				</Alert>
			</Box>
			<form onSubmit={submitForm} noValidate>
				<TextField
					fullWidth
					id="url"
					type="url"
					placeholder="https://wordpress.org"
					label="URL"
					variant="outlined"
					onChange={changeForm}
					disabled={!connectionState}
				/>
				<Box my={2}>
					<Stack spacing={2} direction="row">
						<Button type="submit" variant="contained" value="Submit" disabled={!connectionState}>
							Submit
						</Button>
						<UserAgentModel />
					</Stack>
				</Box>
			</form>
		</>
	)
}

interface Props {
	url: string
}

export const InspectonResult = ({ url }: Props) => {
	const { apiAgent } = useAPIContext()
	const navigate = useNavigate()
	const [siteDetails, setSiteDetails] = useState<IInspectionDetails[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [requestError, setRError] = useState<boolean>(false)

	useEffect(() => {
		const addSoftwareToList = (inspection: IInspectionDetails, type: string) => {
			const list = siteDetails
			const newItem = inspection
			newItem.type = type
			list.push(newItem)
			setSiteDetails(list)
		}

		apiAgent.Inspection.inspect(url)
			.then((response) => {
				response.technology.cms.forEach((res) => addSoftwareToList(res, "CMS"))
				response.technology.frontend.forEach((res) => addSoftwareToList(res, "Frontend"))
				response.technology.javascript.forEach((res) => addSoftwareToList(res, "JavaScript"))
				response.technology.cdn.forEach((res) => addSoftwareToList(res, "CDN"))
				response.technology.seo.forEach((res) => addSoftwareToList(res, "SEO"))
				response.technology.language.forEach((res) => addSoftwareToList(res, "Language"))
				response.technology.server.forEach((res) => addSoftwareToList(res, "Server"))
			})
			.catch(() => setRError(true))
			.finally(() => setLoading(false))
	}, [url, siteDetails, apiAgent])

	if (loading) {
		return (
			<Grid container spacing={0} my={2} direction="column" alignItems="center">
				<Grid item xs={3}>
					<CircularProgress />
				</Grid>
				<Grid item xs={3}>
					<Typography>Inspecting the site...</Typography>
				</Grid>
			</Grid>
		)
	}

	return (
		<Box>
			<Typography my={1} color="darkgrey">
				For the URL {url} ...
			</Typography>
			<Box my={2}>
				{!requestError ? (
					<>
						{siteDetails.length > 0 ? (
							<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
								{siteDetails.map((jslib, i) => {
									return (
										<Grid key={i} item xs={12} md={6}>
											<DetailCard details={jslib} url={url} />
										</Grid>
									)
								})}
							</Grid>
						) : (
							<Box>
								<Typography variant="h1" my={2}>
									Nothing detected!
								</Typography>
								<Typography my={1} color="darkgrey">
									We can see the site, but nothing was detected against our algorithms
								</Typography>
								<Typography>
									This can happen when the site uses technology not known by the system, or when the website is using
									methods to customise libraries and functions, which may not be understood by the algorithm.
								</Typography>
							</Box>
						)}
					</>
				) : (
					<Box>
						<Typography variant="h1" my={2}>
							Access failed
						</Typography>
						<Typography my={1} color="darkgrey">
							For some reason, our API cannot access the specified URL
						</Typography>
						<Typography>
							Check to make sure the website you specified is a correct, valid address. This can also happen if the
							website has blocked us from scanning it.
						</Typography>
					</Box>
				)}
			</Box>
			<Stack direction="row" spacing={2} my={2}>
				<Button variant="contained" value="Return" onClick={() => navigate("/inspect")}>
					Check Another Site
				</Button>
				<SaveScratchButton title={`Inspection of ${url}`} message={JSON.stringify(siteDetails, null, 2)} />
				<ReportInspectionError url={url} object={siteDetails} />
			</Stack>
			<Typography my={1} color="darkgrey">
				All brand logos courtesy from{" "}
				<Link href="https://simpleicons.org" target="_blank" rel="noopener">
					Simple Icons
				</Link>
				.
			</Typography>
		</Box>
	)
}

export const InspectonResultDisplay = () => {
	const inspectionURL = window.location.hash.slice(10)

	useEffect(() => {
		document.title = `${inspectionURL} - What's This?`
	})

	return <InspectonResult url={inspectionURL} />
}
