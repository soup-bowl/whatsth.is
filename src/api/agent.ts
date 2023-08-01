import axios, { AxiosResponse } from 'axios';
import { IDNSResult, IInspectionResult, IOpenAPI, IWHOISResult } from '../interfaces';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T> ( response: AxiosResponse<T> ) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
};

const Details = {
	openapi: () => requests.get<IOpenAPI>('/swagger/v1/swagger.json'),
}

const Inspection = {
	inspect: (url: string) => requests.get<IInspectionResult>('/inspect/' + encodeURIComponent(url)),
};

const DNS = {
	dns: (url: string) => requests.get<IDNSResult>(`/dns/${encodeURIComponent(url)}`),
	whois: (url: string) => requests.get<IWHOISResult>(`/whois/${encodeURIComponent(url)}`),
};

const agent = {
	Details,
	Inspection,
	DNS
};

export default agent;
