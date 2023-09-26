import { GridColDef } from "@mui/x-data-grid";
import { SecondType } from "./enums";

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}

export interface ILookupTable {
	columns: GridColDef[];
	rows: ILookupTableLayout[];
}

export interface ILookupTableLayout {
	id: number;
	key: string;
	value: string;
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

export interface IDomainSelection {
	protocol: string;
	url: string;
}
