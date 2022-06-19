import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T> ( response: AxiosResponse<T> ) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody)
};

const Details = {
	stats: () => requests.get('/info'),
	firstCheck: (url: string) => requests.get('/inspect/' + encodeURIComponent(url))
};

const DNS = {
	protocols: () => requests.get('/dns/protocols'),
	probe: (protocol: string, url: string) => requests.get(`/dns/${protocol}/${encodeURIComponent(url)}`),
};

const agent = {
	Details,
	DNS
};

export default agent;
