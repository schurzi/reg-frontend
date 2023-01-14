import { createAction } from './create-action'
import { RegistrationInfo } from '~/state/models/register'

export const SubmitRegistration = createAction<undefined, '[Register] UwU'>('[Register] UwU')
export const CheckCountdown = createAction<undefined, '[Register] Check countdown'>('[Register] Check countdown')
export const LoadRegistrationState = createAction<{ readonly isOpen: boolean, readonly registration?: RegistrationInfo }, '[Register] Load registration state'>('[Register] Load registration state')

export type RegisterAction
	= typeof SubmitRegistration
	| typeof CheckCountdown
	| typeof LoadRegistrationState
