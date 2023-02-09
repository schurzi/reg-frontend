import { ReadonlyDate } from '~/util/readonly-types'
import { SaveData } from '~/state/models/autosave'
import { createAction } from './create-action'

export const UpdateLastSavedTime = createAction<ReadonlyDate, '[Autosave] Update last saved time'>('[Autosave] Update last saved time')
export const LoadAutosave = createAction<SaveData, '[Autosave] Load autosave'>('[Autosave] Load autosave')

export type AutosaveAction
	= typeof UpdateLastSavedTime
	| typeof LoadAutosave
