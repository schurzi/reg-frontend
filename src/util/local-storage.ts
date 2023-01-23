export const load = <T>(id: string) => {
	const serializedData = 'localStorage' in globalThis ? localStorage.getItem(id) : null

	return serializedData === null ? null : JSON.parse(serializedData) as T
}

export const save = (id: string, saveData: unknown) => {
	localStorage.setItem(id, JSON.stringify(saveData))
}
