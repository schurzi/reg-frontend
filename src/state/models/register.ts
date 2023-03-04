import config from '~/config'
import { Locale } from '~/localization'
import { ReadonlyDateTime } from '~/util/readonly-types'

type TicketLevelConfig = typeof config.ticketLevels
type TicketAddonsConfig = typeof config.addons

/* eslint-disable @typescript-eslint/indent */
type ParseAddonOption<T> =
	T extends { readonly type: 'select', readonly items: readonly (infer I)[] } ? I
	: never
/* eslint-enable @typescript-eslint/indent */

export type RegistrationStatus =
	| 'new'
	| 'approved'
	| 'partially-paid'
	| 'paid'
	| 'checked-in'
	| 'cancelled'

export type TicketType
	= { readonly type: 'full' }
	| { readonly type: 'day', readonly day: ReadonlyDateTime }

export type TicketLevel = {
	readonly level: keyof TicketLevelConfig
	readonly addons: {
		readonly [K in keyof TicketAddonsConfig]: {
			readonly selected: boolean
			readonly options: {
				[L in keyof TicketAddonsConfig[K]['options']]: ParseAddonOption<TicketAddonsConfig[K]['options'][L]>
			}
		}
		// readonly stagePass: {
		// 	readonly selected: boolean
		// }
		// readonly tshirt: {
		// 	readonly selected: boolean
		// 	readonly size: 'S' | 'M' | 'L' | 'XL' | 'XXL'
		// }
	}
}

export interface ContactInfo {
	readonly email: string
	readonly phoneNumber: string
	readonly telegramUsername: string | null
	readonly street: string
	readonly city: string
	readonly postalCode: string
	readonly stateOrProvince: string | null
	readonly country: (typeof config.allowedCountries)[number]
}

export interface OptionalInfo {
	readonly notifications: {
		readonly art: boolean
		readonly animation: boolean
		readonly music: boolean
		readonly fursuiting: boolean
	}
	readonly digitalConbook: boolean
	readonly comments: string | null
}

export interface PersonalInfo {
	readonly nickname: string
	readonly firstName: string
	readonly lastName: string
	readonly dateOfBirth: ReadonlyDateTime
	readonly fullNamePermission: boolean
	readonly spokenLanguages: readonly string[]
	readonly pronouns: string | null
	readonly wheelchair: boolean
}

export interface RegistrationInfo {
	readonly id?: number
	readonly preferredLocale?: Locale
	readonly status?: RegistrationStatus
	readonly ticketType: TicketType
	readonly ticketLevel: TicketLevel
	readonly contactInfo: ContactInfo
	readonly optionalInfo: OptionalInfo
	readonly personalInfo: PersonalInfo
}
