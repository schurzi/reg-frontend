import { RegistrationInfo } from '~/state/models/register'
import { AnyAppAction, GetAction } from '~/state/actions'
import type { DeepNonNullable } from 'ts-essentials'
import { SubmitForm } from '../actions/forms'
import autosaveData from '~/state/autosave'

export type RegisterState = Partial<RegistrationInfo>

export default (state: RegisterState = autosaveData?.register ?? {}, action: GetAction<AnyAppAction>): RegisterState => {
	switch (action.type) {
		case SubmitForm('register-ticket-type').type:
			return action.payload.type === 'day' ? state : { ...state, ticketType: { type: action.payload.type! } }
		case SubmitForm('register-ticket-day').type:
			return { ...state, ticketType: { type: 'day', day: action.payload.day! } }
		case SubmitForm('register-ticket-level').type:
			return { ...state, ticketLevel: action.payload as DeepNonNullable<typeof action.payload> }
		case SubmitForm('register-contact-info').type:
			return { ...state, contactInfo: action.payload as DeepNonNullable<typeof action.payload> }
		case SubmitForm('register-optional-info').type:
			return { ...state, optionalInfo: action.payload as DeepNonNullable<typeof action.payload> }
		case SubmitForm('register-personal-info').type:
			return { ...state, personalInfo: action.payload as DeepNonNullable<typeof action.payload> }
		default:
			return state
	}
}
