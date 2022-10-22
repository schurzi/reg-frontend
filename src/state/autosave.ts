import { AutosaveData } from './models/autosave'

const serializedData = localStorage.getItem('autosave')

export default serializedData === null ? null : JSON.parse(serializedData) as AutosaveData
