import { Button } from "@mui/material";
import { IInspectionDetails, ILookupTableLayout } from "../interfaces";

const BrowserDetails = () => {
	return (window.navigator.userAgent);
};

export const GeneralTemplate = (url: string, result: any) => {
	const template = `	
	**What was the URL you were scanning?**
	${url}
	
	**What did it respond with?**
	*Please feel free to elaborate here. Below is the object that was recieved from the API and helps significantly with debugging.*

	API Responded with:
	\`\`\`json
	${JSON.stringify(result, null, 2)}
	\`\`\`
	
	**What did you expect the response to be?**
	*If you're the webmaster, tell us the tech. If you're a visitor, please tell us what another detection tool says rather than speculate. A good tool to use is https://builtwith.com/*

	**Client Details**
	\`\`\`
	${BrowserDetails()}
	\`\`\`
	`;

	return (encodeURIComponent(template.replace(/\t/g, '')));
};

interface Props {
	title: string;
	body: string;
	label: string;
}

const ErrorButton = ({ title, body, label }: Props) => {
	const titleEncode = encodeURIComponent(title);
	return (
		<Button
			variant="outlined"
			color="error"
			sx={{ marginLeft: 2 }}
			href={`https://github.com/soup-bowl/api.whatsth.is/issues/new?body=${body}&title=${titleEncode}&labels=${label}`}
			target="_blank"
			rel="noopener"
		>Report</Button>
	);
}

interface InspProps {
	url: string;
	object: IInspectionDetails[];
}

export const ReportInspectionError = ({ url, object }: InspProps) => {
	return (
		<ErrorButton title={`Failed Detection URL: ${url}`} body={GeneralTemplate(url, object)} label="detection-fail" />
	);
}

interface DNSProps {
	url: string;
	protocol: string;
	object: ILookupTableLayout[];
}

export const ReportDNSError = ({ url, protocol, object }: DNSProps) => {
	return (
		<ErrorButton title={`Failed ${protocol} on URL: ${url}`} body={GeneralTemplate(`[${protocol}] ${url}`, object)} label="detection-fail" />
	);
}
