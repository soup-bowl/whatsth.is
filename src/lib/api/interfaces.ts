export interface APIAgentType {
	Details: {
		openapi: () => Promise<IOpenAPI>
	}
	Inspection: {
		inspect: (url: string) => Promise<IInspectionResult>
	}
	DNS: {
		dns: (url: string) => Promise<IDNSResult>
		whois: (url: string) => Promise<IWHOISResult>
	}
}

export interface IOpenAPI {
	info: {
		title: string
		description: string
		version: string
	}
}

export interface IInspectionResult {
	technology: IInspectionTechnology
	url: string
}

export interface IInspectionTechnology {
	cms: IInspectionDetails[]
	frontend: IInspectionDetails[]
	javascript: IInspectionDetails[]
	cdn: IInspectionDetails[]
	seo: IInspectionDetails[]
	language: IInspectionDetails[]
	server: IInspectionDetails[]
}

export interface IInspectionDetails {
	name: string
	description: string
	type?: string
	url: string
	matchAvailable: number
	matchedOn: string[]
}

export interface IDNSResult {
	a: string[]
	aaaa: string[]
	cname: string[]
	mx: {
		address: string
		priority: number
	}[]
	txt: string[]
	ns: string[]
}

export interface IWHOISResult {
	domain: string
	registrar: string
	whois: string
	nameServers: string[]
	created: string
	updated: string
	expires: string
}
