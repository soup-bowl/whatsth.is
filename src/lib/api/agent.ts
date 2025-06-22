import { IDNSResult, IInspectionResult, IOpenAPI, IWHOISResult } from "./interfaces"

class Agent {
	private baseUrl: string

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	private async responseBody<T>(response: Response): Promise<T> {
		const data = await response.json()
		return data
	}

	private async get<T>(url: string): Promise<T> {
		const response = await fetch(this.baseUrl + url)
		if (!response.ok) {
			throw new Error("Network response was not ok.")
		}
		return this.responseBody<T>(response)
	}

	Details = {
		openapi: () => this.get<IOpenAPI>("/swagger/v1/swagger.json"),
	}

	Inspection = {
		inspect: (url: string) => this.get<IInspectionResult>("/inspect/" + encodeURIComponent(url)),
	}

	DNS = {
		dns: (url: string) => this.get<IDNSResult>(`/dns/${encodeURIComponent(url)}`),
		whois: (url: string) => this.get<IWHOISResult>(`/whois/${encodeURIComponent(url)}`),
	}
}

export default Agent
