import type { FieldValues } from 'react-hook-form'
import type { Builtin } from 'ts-essentials'
import type { AdditionalInfo, GuestsInfo, RoomInfo } from './models/hotel-booking'
import type { ContactInfo, OptionalInfo, PersonalInfo, TicketLevel, TicketType } from './models/register'
import config from '~/config'
import { map } from 'ramda'

/* eslint-disable @typescript-eslint/indent */
export declare type DeepField<T> =
	T extends boolean
	? T
	// : '' extends T
	// ? T
	: T extends Builtin
	? T | null
	: T extends readonly unknown[]
	? T
	: T extends {}
	? { readonly [K in keyof T]: DeepField<T[K]> }
	: T | null
/* eslint-enable @typescript-eslint/indent */

export type Form<ValuesType extends FieldValues> = {
	readonly defaultValues: DeepField<ValuesType>
}

const createForm = <ValuesType extends FieldValues>(defaultValues: DeepField<ValuesType>): Form<ValuesType> => ({ defaultValues })

export const forms = {
	'register-ticket-type': createForm<{ readonly type: TicketType['type'] }>({
		type: 'full',
	}),
	'register-ticket-day': createForm<{ readonly day: string }>({
		day: null,
	}),
	'register-ticket-level': createForm<TicketLevel>({
		level: null,
		addons: map(addon => ({
			selected: addon.default,
			options: map(option => option.default as never, addon.options),
		}), config.addons),
	}),
	'register-personal-info': createForm<Omit<PersonalInfo, 'pronouns' | 'dateOfBirth'> & {
		readonly pronounsSelection: 'prefer-not-to-say' | 'He/Him' | 'She/Her' | 'They/Them' | 'other'
		readonly pronounsOther: string
		readonly dateOfBirth: string
	}>({
		nickname: null,
		firstName: null,
		lastName: null,
		fullNamePermission: false,
		dateOfBirth: null,
		spokenLanguages: [],
		pronounsSelection: 'prefer-not-to-say',
		pronounsOther: null,
		wheelchair: false,
	}),
	'register-contact-info': createForm<ContactInfo>({
		email: null,
		phoneNumber: null,
		telegramUsername: null,
		street: null,
		city: null,
		postalCode: null,
		stateOrProvince: null,
		country: null,
	}),
	'register-optional-info': createForm<OptionalInfo>({
		notifications: {
			art: false,
			animation: false,
			music: false,
			fursuiting: false,
		},
		comments: null,
	}),
	'register-summary': createForm<{ readonly rulesAndConditionsAccepted: boolean }>({
		rulesAndConditionsAccepted: false,
	}),
	'hotel-booking-room': createForm<RoomInfo>({
		type: null,
	}),
	'hotel-booking-guests': createForm<GuestsInfo>({
		guests: [],
	}),
	'hotel-booking-additional-info': createForm<AdditionalInfo>({
		comments: null,
	}),
} as const

// export type FormUnion = (typeof forms)[keyof typeof forms]
// export type FormId<F extends FormUnion> = F['id']
export type FormIds = keyof typeof forms
export type GetForm<FId extends FormIds> = typeof forms[FId]
export type FormValuesType<FId extends FormIds> = GetForm<FId> extends Form<infer V> ? DeepField<V> : never
