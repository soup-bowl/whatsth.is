import { GridColDef } from "@mui/x-data-grid"
import { ScratchpadItemType } from "./enums"

export interface DialogTitleProps {
	id: string
	children?: React.ReactNode
	onClose: () => void
}

export interface ILookupTable {
	columns: GridColDef[]
	rows: ILookupTableLayout[]
}

export interface ILookupTableLayout {
	id: number
	key: string
	value: string
}

export interface IStringMorph {
	decoded: string
	encoded: string
	decodeError: boolean
}

export interface IMenu {
	name: string
	category: number
	icon: React.ReactNode
	url: string
	needsInternet: boolean
	beta?: boolean
}

export interface IMenuCategory {
	id: number
	name: string
	description?: string
}

export interface IStorage {
	quota: number
	usage: number
}

export interface IDomainSelection {
	protocol: string
	url: string
}

export interface IScratchpadItem {
	id: string
	created: number
	title: string
	type: ScratchpadItemType
	message: string
	image?: string
}

export interface IPossibleScratchpadItem {
	id?: string
	created?: number
	title?: string
	type?: ScratchpadItemType
	message?: string
	image?: string
}
