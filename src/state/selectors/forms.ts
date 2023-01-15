import { formatISO } from 'date-fns'
import { includes } from '~/util/includes'
import { AppState } from '..'
import { FormIds, FormValuesType } from '../forms'

type GetSubmittedFormValuesFn = <F extends FormIds>(id: F) => (s: AppState) => FormValuesType<F> | undefined

export const getFormValues = <F extends FormIds>(id: F) => (s: AppState) => s.forms[id]

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
				...includes(['He/Him', 'She/Her', 'They/Them', null] as const, pronouns)
					? { pronounsSelection: pronouns, pronounsOther: null }
					: { pronounsSelection: 'other', pronounsOther: pronouns },
			}
		}

		case 'register-contact-info':
			return s.register.registrationInfo.contactInfo
		case 'register-optional-info':
			return s.register.registrationInfo.optionalInfo

		case 'hotel-booking-room':
		case 'hotel-booking-guests':
		case 'hotel-booking-additional-info':
			return undefined
	}
}) as GetSubmittedFormValuesFn
