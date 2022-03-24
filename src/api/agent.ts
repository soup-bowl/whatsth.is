import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T> ( response: AxiosResponse<T> ) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody)
};

const Details = {
	firstCheck: (url: string) => requests.get('/' + url)
};

const agent = {
	Details
};

export default agent;
