import { DateTime } from 'luxon'
import { createAction } from './create-action'

export const UpdateLastSavedTime = createAction<DateTime, '[Autosave] Update last saved time'>('[Autosave] Update last saved time')

export type AutosaveAction
	= typeof UpdateLastSavedTime
