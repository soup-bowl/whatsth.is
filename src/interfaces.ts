export interface PageProps {
	online: boolean;
}

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

export interface IMenu {
	name: string;
	category: number;
	icon: JSX.Element;
	url: string;
	needsInternet: boolean;
	beta?: boolean;
}

export interface IMenuCategory {
	id: number;
	name: string;
	description?: string;
}
