import { AutosaveAction } from './autosave'
import { RegisterAction } from './register'

export type { GetAction } from './create-action'

export type AnyAppAction
	= AutosaveAction
	| RegisterAction
