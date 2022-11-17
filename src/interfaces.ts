import { GridColumns } from "@mui/x-data-grid";
import { SecondType } from "./enums";

export interface IOpenAPI {
	info: IOpenAPIInfo;
}

export interface IOpenAPIInfo {
	title: string;
	description: string;
	version: string;
}

export interface PageProps {
	online: boolean;
}

export interface IRecord {
	id?: number;
	address: string;
	priority: number;
	text: string[];
}

export interface IInspectionResult {
	success: boolean;
	message: IInspectionSiteDetails | string;
	url: string;
}

export interface IInspectionSiteDetails {
	name: string;
	technology: string;
	matched_on: string[];
	additional?: IInspectionWordPress;
}

export interface IInspectionWordPress {
	success: boolean;
	name: string;
	tagline: string;
	timezone: string;
	post_count: number;
	page_count: number;
	cat_count: number;
	latest_post?: IInspectionWordPressPost;
	latest_page?: IInspectionWordPressPost;
}

export interface IInspectionWordPressPost {
	title: string;
	date: string;
	url: string;
}

export interface IDNSResult {
	success: boolean;
	url: string;
	type: string;
	records: IRecord[];
}

export interface IDNSProtocol {
	success: boolean;
	records: IDNSProtocols[];
}

export interface IDNSProtocols {
	type: string;
	name: string;
}

export interface IDNSTableData {
	rows: IRecord[];
	columns: GridColumns;
}

export interface IWHOISResult {
	success: boolean;
	domain: string;
	registrar: string;
	whois_operator: string;
	nameservers: string[];
	date_created: string;
	date_updated: string;
	date_expires: string;
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

export interface IIPGeolocation {
	ip: string;
	loc: string;
	org: string;
	region: string;
	timezone: string;
	country: string;
	city: string;
	hostname: string;
	postal: string;
	icon?: string;
}
