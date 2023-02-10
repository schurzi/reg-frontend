import { formatISO } from 'date-fns'
import { load, remove, save } from '~/util/local-storage'
import { ReadonlyDate } from '~/util/readonly-types'
import { UserInfo } from './auth'
import { RegistrationInfo } from './register'

/* eslint-disable @typescript-eslint/indent */
type DeepDateToString<T> =
	T extends Date | ReadonlyDate
	? string
	: T extends object
	? { [K in keyof T]: DeepDateToString<T[K]> }
	: T extends readonly (infer U)[]
	? DeepDateToString<U>[]
	: T
/* eslint-enable @typescript-eslint/indent */

export interface SaveData {
	readonly userInfo?: UserInfo
	readonly registrationInfo: Partial<RegistrationInfo>
}

type SerializedSaveData = DeepDateToString<SaveData>

const serialize = (saveData: SaveData): SerializedSaveData => ({
	...saveData,
	registrationInfo: {
		...saveData.registrationInfo,
		ticketType: saveData.registrationInfo.ticketType === undefined ? undefined : saveData.registrationInfo.ticketType.type !== 'day'
			? saveData.registrationInfo.ticketType
			: {
				...saveData.registrationInfo.ticketType,
				day: formatISO(saveData.registrationInfo.ticketType.day, { representation: 'date' }),
			},
		personalInfo: saveData.registrationInfo.personalInfo === undefined ? undefined : {
			...saveData.registrationInfo.personalInfo,
			dateOfBirth: formatISO(saveData.registrationInfo.personalInfo.dateOfBirth, { representation: 'date' }),
		},
	},
})

const deserialize = (saveData: SerializedSaveData): SaveData => ({
	...saveData,
	registrationInfo: {
		...saveData.registrationInfo,
		ticketType: saveData.registrationInfo.ticketType === undefined ? undefined : saveData.registrationInfo.ticketType.type !== 'day'
			? saveData.registrationInfo.ticketType
			: {
				...saveData.registrationInfo.ticketType,
				day: new Date(saveData.registrationInfo.ticketType.day),
			},
		personalInfo: saveData.registrationInfo.personalInfo === undefined ? undefined : {
			...saveData.registrationInfo.personalInfo,
			dateOfBirth: new Date(saveData.registrationInfo.personalInfo.dateOfBirth),
		},
	},
})

export const loadAutosave = (): SaveData | null => {
	const saveData = load<SerializedSaveData>('redux-state')

	return saveData === null ? null : deserialize(saveData)
}

export const saveAutosave = (saveData: SaveData) => {
	save('redux-state', serialize(saveData))
}

export const removeAutosave = () => {
	remove('redux-state')
}
