import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:43594';

const responseBody = ( response: AxiosResponse ) => response.data;

const requests = {
	get: (url: string) => axios.get(url).then(responseBody)
};

const Details = {
	firstCheck: (url: string) => requests.get('/' + url)
};

const agent = {
	Details
};

export default agent;
