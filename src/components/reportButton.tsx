const BrowserDetails = () => {
	return window.navigator.userAgent
}

export const GeneralTemplate = (url: string, result: string) => {
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
	`

	return encodeURIComponent(template.replace(/\t/g, ""))
}
