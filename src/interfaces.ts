import { GridColumns } from "@mui/x-data-grid";
import { SecondType } from "./enums";

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}

export interface IOpenAPI {
	info: IOpenAPIInfo;
}

export interface IOpenAPIInfo {
	title: string;
	description: string;
	version: string;
}

export interface IInspectionResult {
	technology: IInspectionTechnology;
	url: string;
}

export interface IInspectionTechnology {
	cms: IInspectionDetails[];
	frontend: IInspectionDetails[];
	javascript: IInspectionDetails[];
	cdn: IInspectionDetails[];
	seo: IInspectionDetails[];
	language: IInspectionDetails[];
	server: IInspectionDetails[];
}

export interface IInspectionDetails {
	name: string;
	description: string;
	type?: string;
	url: string;
	matchAvailable: number;
	matchedOn: string[];
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

export interface ILookupTable {
	columns: GridColumns;
	rows: ILookupTableLayout[];
}

export interface ILookupTableLayout {
	id: number;
	key: string;
	value: string;
}

export interface IDNSResult {
	a: string[];
	aaaa: string[];
	cname: string[];
	mx: IDNSRecordDetails[];
	txt: string[];
	ns: string[];
}

export interface IDNSRecordDetails {
	address: string;
	priority: number;
}

export interface IWHOISResult {
	domain: string;
	registrar: string;
	whois: string;
	nameServers: string[];
	created: string;
	updated: string;
	expires: string;
}

export interface IStringMorph {
	decoded: string;
	encoded: string;
	decodeError: boolean;
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

export interface IDomainSelection {
	protocol: string;
	url: string;
}

export interface RGB {
	r: number;
	g: number;
	b: number;
}

export interface HSL {
	h: number;
	s: number;
	l: number;
}

export interface CMYK {
	c: number;
	m: number;
	y: number;
	k: number;
}

export interface Hue {
	p: number;
	q: number;
	t: number;
}

export interface IColourValues {
	hex: string;
	rgb: RGB;
	hsl: HSL;
	cmyk: CMYK;
	htmlCode: string;
	xkcdCode: string;
	oxVar: string;
}
