import { createAction } from './create-action'

export const SubmitRegistration = createAction<undefined, '[Register] UwU'>('[Register] UwU')
export const RegistrationSubmissionFailed = createAction<unknown, '[Register] TwT'>('[Register] TwT')

export type RegisterAction
	= typeof SubmitRegistration
	| typeof RegistrationSubmissionFailed
