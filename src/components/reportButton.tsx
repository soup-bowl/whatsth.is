import { Button } from "@mui/material";

interface Props {
	template: string;
	title: string;
}


export default function ReportError({ template, title }: Props) {
	let titleEncode = encodeURIComponent(title);
	return (
		<Button
			variant="outlined"
			color="error"
			sx={{ marginLeft: 2 }}
			href={`https://github.com/soup-bowl/api.whatsth.is/issues/new?template=${template}.md&title=${titleEncode}`}
			target="_blank"
			rel="noopener"
		>Report</Button>
	);
}
