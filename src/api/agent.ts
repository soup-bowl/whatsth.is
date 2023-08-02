import { IDNSResult, IInspectionResult, IOpenAPI, IWHOISResult } from '../interfaces';

const baseUrl = import.meta.env.VITE_API_URL;

const responseBody = async <T>(response: Response): Promise<T> => {
	const data = await response.json();
	return data;
};

const get = async <T>(url: string): Promise<T> => {
	const response = await fetch(baseUrl + url);
	if (!response.ok) {
		throw new Error('Network response was not ok.');
	}
	return responseBody<T>(response);
};

const Details = {
	openapi: () => get<IOpenAPI>('/swagger/v1/swagger.json'),
};

const Inspection = {
	inspect: (url: string) => get<IInspectionResult>('/inspect/' + encodeURIComponent(url)),
};

const DNS = {
	dns: (url: string) => get<IDNSResult>(`/dns/${encodeURIComponent(url)}`),
	whois: (url: string) => get<IWHOISResult>(`/whois/${encodeURIComponent(url)}`),
};

const agent = {
	Details,
	Inspection,
	DNS,
};

export default agent;
