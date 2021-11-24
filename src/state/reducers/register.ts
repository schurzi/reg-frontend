import { ContactInfo, OptionalInfo, PersonalInfo, TicketLevel, TicketType } from '../models/register'
import { AppAction } from '../actions'
import { SubmitTicketType, SubmitTicketDay, SubmitTicketLevel, SubmitContactInfo, SubmitOptionalInfo, SubmitPersonalInfo } from '../actions/register'
import { GetAction } from '../actions/create-action'

export interface RegisterState {
	readonly ticketType?: TicketType
	readonly ticketLevel?: TicketLevel
	readonly contactInfo?: ContactInfo
	readonly optionalInfo?: OptionalInfo
	readonly personalInfo?: PersonalInfo
}

export default (state: RegisterState = {}, action: GetAction<AppAction>) => {
	switch (action.type) {
		case SubmitTicketType.type:
			return action.payload === 'day' ? state : { ...state, ticketType: { type: action.payload } }
		case SubmitTicketDay.type:
			return { ...state, ticketType: { type: 'day', day: action.payload } }
		case SubmitTicketLevel.type:
			return { ...state, ticketLevel: action.payload }
		case SubmitContactInfo.type:
			return { ...state, contactInfo: action.payload }
		case SubmitOptionalInfo.type:
			return { ...state, optionalInfo: action.payload }
		case SubmitPersonalInfo.type:
			return { ...state, personalInfo: action.payload }
		default:
			return state
	}
}
