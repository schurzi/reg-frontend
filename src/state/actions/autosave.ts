import { DateTime } from 'luxon'
import { AutosaveData } from '~/state/models/autosave'
import { createAction } from './create-action'

export const UpdateLastSavedTime = createAction<DateTime, '[Autosave] Update last saved time'>('[Autosave] Update last saved time')
export const LoadAutosaveData = createAction<AutosaveData, '[Autosave] Load autosave data'>('[Autosave] Load autosave data')

export type AutosaveAction
	= typeof UpdateLastSavedTime
	| typeof LoadAutosaveData
