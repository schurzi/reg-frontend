import { createSelector } from 'reselect'
import config from '~/config'
import { createLuxonFluentDateTime } from '~/util/fluent-values'
import { AppState } from '..'
import { buildInvoice, UncalculatedInvoiceItem } from '../models/invoice'
import { getUserInfo } from './auth'

export const isRegistrationOpen = () => (s: AppState) => s.register.isOpen
export const isEditMode = () => (s: AppState) => s.register.registrationInfo.id !== undefined

export const getPaidAmount = () => (s: AppState) => s.register.paid
export const getDueAmount = () => (s: AppState) => s.register.due

export const getRegistrationInfo = () => (s: AppState) => s.register.registrationInfo
export const getRegistrationId = () => (s: AppState) => s.register.registrationInfo.id
export const getPreferredLocale = () => (s: AppState) => s.register.registrationInfo.preferredLocale
export const getTicketType = () => (s: AppState) => s.register.registrationInfo.ticketType
export const getTicketLevel = () => (s: AppState) => s.register.registrationInfo.ticketLevel
export const getPersonalInfo = () => (s: AppState) => s.register.registrationInfo.personalInfo
export const getContactInfo = () => (s: AppState) => s.register.registrationInfo.contactInfo
export const getOptionalInfo = () => (s: AppState) => s.register.registrationInfo.optionalInfo

export const getInvoice = createSelector(getTicketType(), getTicketLevel(), getPaidAmount(), getDueAmount(), (ticketType, ticketLevel, paid, due) => {
	if (ticketLevel === undefined || ticketType === undefined) {
		return undefined
	}

	const ticketLevelConfig = config.ticketLevels[ticketLevel.level]

	const ticketLine: UncalculatedInvoiceItem = ticketType.type === 'day'
		? {
			id: 'register-ticket-type-day',
			amount: 1,
			options: { day: createLuxonFluentDateTime(ticketType.day) },
			unitPrice: ticketLevelConfig.prices.day,
		}
		: {
			id: 'register-ticket-type-full',
			amount: 1,
			options: { start: createLuxonFluentDateTime(config.eventStartDate), end: createLuxonFluentDateTime(config.eventEndDate) },
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

	return buildInvoice([ticketLine, ...addonLines], { paid, due })
})

export const getVerifiedEmails = () => (s: AppState) => {
	const editMode = isEditMode()(s)
	const userEmail = getUserInfo()(s)!.email

	return editMode ? [getContactInfo()(s)!.email, userEmail] : [userEmail]
}
