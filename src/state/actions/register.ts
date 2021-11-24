import { TicketType, TicketLevel, ContactInfo, OptionalInfo, PersonalInfo } from '../models/register'
import { createAction } from './create-action'

export const SubmitTicketType = createAction<TicketType['type'], '[Register] Submit ticket type'>('[Register] Submit ticket type')
export const SubmitTicketDay = createAction<string, '[Register] Submit ticket day'>('[Register] Submit ticket day')
export const SubmitTicketLevel = createAction<TicketLevel, '[Register] Submit ticket level'>('[Register] Submit ticket level')
export const SubmitContactInfo = createAction<ContactInfo, '[Register] Submit contact info'>('[Register] Submit contact info')
export const SubmitOptionalInfo = createAction<OptionalInfo, '[Register] Submit optional info'>('[Register] Submit optional info')
export const SubmitPersonalInfo = createAction<PersonalInfo, '[Register] Submit personal info'>('[Register] Submit personal info')

export type RegisterAction
	= typeof SubmitTicketType
	| typeof SubmitTicketDay
	| typeof SubmitTicketLevel
	| typeof SubmitContactInfo
	| typeof SubmitOptionalInfo
	| typeof SubmitPersonalInfo
