import { createAction } from './create-action'

export const SubmitRegistration = createAction<undefined, '[Register] UwU'>('[Register] UwU')

export type RegisterAction
	= typeof SubmitRegistration
