import { ContactInfo, OptionalInfo, PersonalInfo, TicketLevel, TicketType } from '../models/register'
import { AnyAppAction, GetAction } from '../actions'
import { SubmitTicketType, SubmitTicketDay, ChangeTicketLevel, ChangeContactInfo, ChangeOptionalInfo, ChangePersonalInfo } from '../actions/register'
import { LoadAutosaveData } from '../actions/autosave'

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
		case ChangeTicketLevel.type:
			return { ...state, ticketLevel: action.payload }
		case ChangeContactInfo.type:
			return { ...state, contactInfo: action.payload }
		case ChangeOptionalInfo.type:
			return { ...state, optionalInfo: action.payload }
		case ChangePersonalInfo.type:
			return { ...state, personalInfo: action.payload }
		case LoadAutosaveData.type:
			return action.payload.register
		default:
			return state
	}
}
