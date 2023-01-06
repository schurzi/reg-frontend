import { createSelector } from 'reselect'
import config from '~/config'
import { AppState } from '..'
import { buildInvoice, UncalculatedInvoiceItem } from '../models/invoice'

export const getRegistrationInfo = () => (s: AppState) => s.register
export const getTicketType = () => (s: AppState) => s.register.ticketType
export const getTicketLevel = () => (s: AppState) => s.register.ticketLevel
export const getPersonalInfo = () => (s: AppState) => s.register.personalInfo
export const getContactInfo = () => (s: AppState) => s.register.contactInfo
export const getOptionalInfo = () => (s: AppState) => s.register.optionalInfo

export const getInvoice = createSelector(getTicketType(), getTicketLevel(), (ticketType, ticketLevel) => {
	if (ticketLevel === undefined || ticketType === undefined) {
		return undefined
	}

	const ticketLevelConfig = config.ticketLevels[ticketLevel.level]

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

	const addonLines = Object.entries(ticketLevel.addons)
		.filter(([, addon]) => addon.selected)
		.map(([addonId, addon]) => ({
			id: `register-ticket-addons-${addonId}`,
			amount: 1,
			unitPrice: config.ticketLevels[ticketLevel.level].includes?.includes(addonId) ?? false ? 0 : config.addons[addonId].price,
			options: addon.options,
		}))

	return buildInvoice([ticketLine, ...addonLines])
})
