import { ScratchpadItemType } from "../enums"
import { IPossibleScratchpadItem, IScratchpadItem } from "../interfaces"
import { readFromLocalStorage, writeToLocalStorage } from "./localStorage"

export const getScratches = () => readFromLocalStorage<IScratchpadItem[]>("WTScratchpadItems")
export const saveScratches = (items: IScratchpadItem[]) =>
	writeToLocalStorage<IScratchpadItem[]>("WTScratchpadItems", items)

export const addScratch = (scratches: IScratchpadItem[], item: IScratchpadItem) => {
	let items = scratches

	if (items === undefined) {
		items = []
	}

	items.push(item)

	return items
}

export const removeScratch = (scratches: IScratchpadItem[], id: string): IScratchpadItem[] =>
	scratches.filter((item) => item.id !== id) ?? []

export const updateScratch = (scratches: IScratchpadItem[], sratch: IScratchpadItem) => {
	const items = scratches.filter((item) => item.id !== sratch.id) ?? []
	items.push(sratch)
	return items
}

export const createItem = (title: string, message: string): IScratchpadItem => ({
	id: self.crypto.randomUUID(),
	created: Date.now(),
	type: ScratchpadItemType.Text,
	title: title,
	message: message,
})

export const createItemViaPossible = (item: IPossibleScratchpadItem): IScratchpadItem => ({
	id: item.id ?? self.crypto.randomUUID(),
	created: item.created ?? Date.now(),
	type: item.type ?? ScratchpadItemType.Text,
	title: item.title ?? "Undefined Title",
	message: item.message ?? "",
})
