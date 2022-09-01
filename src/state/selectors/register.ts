import { AppState } from '..'
import { TicketType, TicketLevel, PersonalInfo, ContactInfo, OptionalInfo } from '../models/register'

export const getTicketType = () => (s: AppState) => s.register.ticketType as TicketType | undefined
export const getTicketLevel = () => (s: AppState) => s.register.ticketLevel as TicketLevel | undefined
export const getPersonalInfo = () => (s: AppState) => s.register.personalInfo as PersonalInfo | undefined
export const getContactInfo = () => (s: AppState) => s.register.contactInfo as ContactInfo | undefined
export const getOptionalInfo = () => (s: AppState) => s.register.optionalInfo as OptionalInfo | undefined
