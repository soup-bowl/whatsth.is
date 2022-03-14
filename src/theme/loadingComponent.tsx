import React from "react";
import {Typography} from '@mui/material';

interface Props {
	inverted?: boolean;
	content?: string;

}

export default function LoadingComponent({inverted = true, content = 'Loading...'}: Props) {
	return (
		<Typography>
		{content}
		</Typography>
	);
};
