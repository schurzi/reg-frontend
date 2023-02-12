import { formatISO } from 'date-fns'
import { includes } from '~/util/includes'
import { AppState } from '..'
import { FormIds, FormValuesType } from '../forms'
import config from '~/config'
import { map } from 'ramda'

type GetDefaultFormValuesFn = <F extends FormIds>(id: F) => (s: AppState) => FormValuesType<F>

// eslint-disable-next-line complexity
export const getDefaultFormValues = ((id: FormIds) => (s: AppState): FormValuesType<FormIds> => {
	switch (id) {
		case 'register-ticket-type':
			return {
				type: 'full',
			}
		case 'register-ticket-day':
			return {
				day: null,
			}
		case 'register-ticket-level':
			return {
				level: null,
				addons: map(addon => ({
					selected: addon.default,
					options: map(option => option.default as never, addon.options),
				}), config.addons),
			}
		case 'register-personal-info':
			return {
				nickname: null,
				firstName: null,
				lastName: null,
				fullNamePermission: false,
				dateOfBirth: null,
				spokenLanguages: [],
				pronounsSelection: 'prefer-not-to-say',
				pronounsOther: null,
				wheelchair: false,
			}
		case 'register-contact-info':
			return {
				email: s.auth.userInfo!.email,
				phoneNumber: null,
				telegramUsername: null,
				street: null,
				city: null,
				postalCode: null,
				stateOrProvince: null,
				country: null,
			}
		case 'register-optional-info':
			return {
				notifications: {
					art: false,
					animation: false,
					music: false,
					fursuiting: false,
				},
				digitalConbook: false,
				comments: null,
			}
		case 'register-summary':
			return {
				rulesAndConditionsAccepted: false,
			}

		case 'hotel-booking-room':
			return {
				type: null,
			}
		case 'hotel-booking-guests':
			return {
				guests: [],
			}
		case 'hotel-booking-additional-info':
			return {
				comments: null,
			}
	}
}) as GetDefaultFormValuesFn

type GetSubmittedFormValuesFn = <F extends FormIds>(id: F) => (s: AppState) => FormValuesType<F> | undefined

// eslint-disable-next-line complexity
export const getSubmittedFormValues = ((id: FormIds) => (s: AppState): FormValuesType<FormIds> | undefined => {
	switch (id) {
		case 'register-ticket-type':
			return s.register.registrationInfo.ticketType === undefined ? undefined : { type: s.register.registrationInfo.ticketType.type }
		case 'register-ticket-day':
			return s.register.registrationInfo.ticketType === undefined || s.register.registrationInfo.ticketType.type !== 'day'
				? undefined
				: { day:	formatISO(s.register.registrationInfo.ticketType.day, { representation: 'date' }) }
		case 'register-ticket-level':
			return s.register.registrationInfo.ticketLevel

		case 'register-personal-info': {
			if (s.register.registrationInfo.personalInfo === undefined) {
				return undefined
			}

			const { pronouns, dateOfBirth, ...personalInfo } = s.register.registrationInfo.personalInfo

			return {
				...personalInfo,
				dateOfBirth: formatISO(dateOfBirth, { representation: 'date' }),
				...pronouns === null
					? { pronounsSelection: 'prefer-not-to-say', pronounsOther: null }
					: includes(['He/Him', 'She/Her', 'They/Them'] as const, pronouns)
						? { pronounsSelection: pronouns, pronounsOther: null }
						: { pronounsSelection: 'other', pronounsOther: pronouns },
			}
		}

		case 'register-contact-info':
			return s.register.registrationInfo.contactInfo
		case 'register-optional-info':
			return s.register.registrationInfo.optionalInfo
		case 'register-summary':
			return s.register.registrationInfo.id === undefined ? undefined : { rulesAndConditionsAccepted: true }

		case 'hotel-booking-room':
		case 'hotel-booking-guests':
		case 'hotel-booking-additional-info':
			return undefined
	}
}) as GetSubmittedFormValuesFn
