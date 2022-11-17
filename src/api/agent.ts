import axios, { AxiosResponse } from 'axios';
import { IDNSProtocol, IDNSResult, IInspectionResult, IOpenAPI } from '../interfaces';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T> ( response: AxiosResponse<T> ) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody)
};

const Details = {
	openapi: () => requests.get<IOpenAPI>('/openapi.json'),
}

const Inspection = {
	inspect: (url: string) => requests.get<IInspectionResult>('/inspect/' + encodeURIComponent(url))
};

const DNS = {
	protocols: () => requests.get<IDNSProtocol>('/dns/protocols'),
	probe: (protocol: string, url: string) => requests.get<IDNSResult>(`/dns/${protocol}/${encodeURIComponent(url)}`),
};

const agent = {
	Details,
	Inspection,
	DNS
};

export default agent;
