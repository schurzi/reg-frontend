import { ContactInfo, OptionalInfo, PersonalInfo, TicketLevel, TicketType } from '../models/register'
import { AnyAppAction, GetAction } from '../actions'
import { SubmitTicketType, SubmitTicketDay, SubmitTicketLevel, SubmitContactInfo, SubmitOptionalInfo, SubmitPersonalInfo } from '../actions/register'

export interface RegisterState {
	readonly ticketType?: TicketType
	readonly ticketLevel?: TicketLevel
	readonly contactInfo?: ContactInfo
	readonly optionalInfo?: OptionalInfo
	readonly personalInfo?: PersonalInfo
}

export default (state: RegisterState = {}, action: GetAction<AnyAppAction>): RegisterState => {
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
