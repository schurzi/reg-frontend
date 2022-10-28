import { AutosaveAction } from './autosave'
import { FormAction } from './forms'
import { RegisterAction } from './register'

export type { GetAction } from './create-action'

export type AnyAppAction =
	| AutosaveAction
	| FormAction
	| RegisterAction
