import { GridColumns } from "@mui/x-data-grid";
import { SecondType } from "./enums";

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

export interface IDNSTableData {
	rows: IRecord[];
	columns: GridColumns;
}

export interface IStringMorph {
	decoded: string;
	encoded: string;
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

export interface IIPCollection {
	ipv4: string;
	ipv6: string;
}

export interface ITime {
	string: Date;
	unix: number;
	overflow: boolean;
	type: SecondType;
}

export interface IStorage {
	quota: number;
	usage: number;
}
