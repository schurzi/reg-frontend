import { RegistrationInfo } from '~/state/models/register'
import { createAction } from './create-action'

export type LoadedRegistrationState = {
	readonly isOpen: boolean
} & ({} | {
	readonly registrationInfo: RegistrationInfo
	readonly due: number
	readonly paid: number
	readonly unprocessedPayments: boolean
})

export const CheckCountdown = createAction<undefined, '[Register] Check countdown'>('[Register] Check countdown')
export const LoadRegistrationState = createAction<LoadedRegistrationState, '[Register] Load registration state'>('[Register] Load registration state')
export const InitiatePayment = createAction<undefined, '[Register] Initiate payment'>('[Register] Initiate payment')

export type RegisterAction
	= typeof CheckCountdown
	| typeof LoadRegistrationState
	| typeof InitiatePayment
