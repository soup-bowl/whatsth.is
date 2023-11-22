export const readFromLocalStorage = <T>(key: string): T | undefined => {
	const value = localStorage.getItem(key);

	if (value) {
		return JSON.parse(value) as T;
	}

	return undefined;
}

export const writeToLocalStorage = <T>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value));
