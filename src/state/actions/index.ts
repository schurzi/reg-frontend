import { AutosaveAction } from './autosave'
import { FormAction } from './forms'

export type { GetAction } from './create-action'

export type AnyAppAction =
	| AutosaveAction
	| FormAction
