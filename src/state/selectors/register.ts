import { createSelector } from 'reselect'
import config from '~/config'
import { AppState } from '..'
import { buildInvoice, UncalculatedInvoiceItem } from '../models/invoice'
import { TicketType, TicketLevel, PersonalInfo, ContactInfo, OptionalInfo } from '../models/register'

export const getTicketType = () => (s: AppState) => s.register.ticketType as TicketType | undefined
export const getTicketLevel = () => (s: AppState) => s.register.ticketLevel as TicketLevel | undefined
export const getPersonalInfo = () => (s: AppState) => s.register.personalInfo as PersonalInfo | undefined
export const getContactInfo = () => (s: AppState) => s.register.contactInfo as ContactInfo | undefined
export const getOptionalInfo = () => (s: AppState) => s.register.optionalInfo as OptionalInfo | undefined

export const getInvoice = createSelector(getTicketType(), getTicketLevel(), (ticketType, ticketLevel) => {
	if (ticketLevel === undefined || ticketType === undefined) {
		return undefined
	}

	const ticketLevelConfig = config.ticketLevels.find(l => l.id === ticketLevel.level)

	if (ticketLevelConfig === undefined) {
		throw new Error('Configuration error: Specified ticket level does not exist!')
	}

	const ticketLine: UncalculatedInvoiceItem = ticketType.type === 'day'
		? {
			id: 'register-ticket-type-day',
			amount: 1,
			options: { day: new Date(ticketType.day) },
			unitPrice: ticketLevelConfig.prices.day,
		}
		: {
			id: 'register-ticket-type-full',
			amount: 1,
			options: { start: new Date(config.eventStartDate), end: new Date(config.eventEndDate) },
			unitPrice: ticketLevelConfig.prices.full,
		}

	const stagePassLine = ticketLevel.addons.stagePass.selected
		? [{ id: 'register-ticket-addons-stage-pass', amount: 1, unitPrice: config.stagePassPrice }]
		: []

	const tshirtLine = ticketLevel.addons.tshirt.selected
		? [{ id: 'register-ticket-addons-tshirt', amount: 1, options: { size: ticketLevel.addons.tshirt.size }, unitPrice: config.tshirtPrice }]
		: []

	return buildInvoice([ticketLine, ...stagePassLine, ...tshirtLine])
})
