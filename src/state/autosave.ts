import { AutosaveData } from './models/autosave'

const serializedData = 'localStorage' in globalThis ? localStorage.getItem('autosave') : null

export default serializedData === null ? null : JSON.parse(serializedData) as AutosaveData
