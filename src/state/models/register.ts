import config from '~/config'
import { ReadonlyDate } from '~/util/readonly-types'

type TicketLevelConfig = typeof config.ticketLevels
type TicketAddonsConfig = typeof config.addons

/* eslint-disable @typescript-eslint/indent */
type ParseAddonOption<T> =
	T extends { readonly type: 'select', readonly items: readonly (infer I)[] } ? I
	: never
/* eslint-enable @typescript-eslint/indent */

export type TicketType
	= { readonly type: 'full' }
	| { readonly type: 'day', readonly day: ReadonlyDate }

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
	readonly telegramUsername: string
	readonly street: string
	readonly city: string
	readonly postalCode: string
	readonly stateOrProvince: string
	readonly country: (typeof config.allowedCountries)[number]
}

export interface OptionalInfo {
	readonly notifications: {
		readonly art: boolean
		readonly animation: boolean
		readonly music: boolean
		readonly fursuiting: boolean
	}
	readonly comments: string
}

export interface PersonalInfo {
	readonly nickname: string
	readonly firstName: string
	readonly lastName: string
	readonly dateOfBirth: ReadonlyDate
	readonly fullNamePermission: boolean
	readonly spokenLanguages: readonly string[]
	readonly pronouns: string
	readonly wheelchair: boolean
}

export interface RegistrationInfo {
	readonly ticketType: TicketType
	readonly ticketLevel: TicketLevel
	readonly contactInfo: ContactInfo
	readonly optionalInfo: OptionalInfo
	readonly personalInfo: PersonalInfo
}
