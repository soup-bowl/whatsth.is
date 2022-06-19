export interface IRecord {
	id?: number;
	address: string;
	priority: number;
	text: string[];
}

export interface IDNSResult {
	success: boolean;
	url: string;
	type: string;
	records: IRecord[];
}

export interface IDNSProtocol {
	type: string;
	name: string;
}
