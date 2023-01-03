import { AuthAction } from './auth'
import { AutosaveAction } from './autosave'
import { ErrorAction } from './errors'
import { FormAction } from './forms'
import { RegisterAction } from './register'

export type { GetAction } from './create-action'

export type AnyAppAction =
	| AuthAction
	| AutosaveAction
	| ErrorAction
	| FormAction
	| RegisterAction
