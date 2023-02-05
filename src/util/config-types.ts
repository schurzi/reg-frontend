import { ComponentType } from 'react'
import { ReadonlyDate } from './readonly-types'

type TicketLevelConfig<Addon extends string> = {
	readonly prices: {
		readonly full: number
		readonly day: number
	}
	readonly includes?: readonly Addon[]
}

type AddonOptionsConfig<Item extends string> = {
	readonly type: 'select'
	readonly items: readonly Item[]
	readonly default?: Item
}

type AddonConfig<OptionsConfigItems> = {
	readonly price: number
	readonly default: boolean
	readonly options: { [K in keyof OptionsConfigItems]: AddonOptionsConfig<OptionsConfigItems[K] & string> }
	readonly unavailableFor?: {
		readonly type?: readonly ('day' | 'full')[]
	}
}

type RoomConfig = {
	readonly id: string
	readonly price: number
	readonly image: ComponentType
}

type Config<TicketLevel extends string, AddonConfigs extends Readonly<Record<string, unknown>>> = {
	readonly eventName: string
	readonly registrationLaunch: ReadonlyDate
	readonly registrationExpirationDate: ReadonlyDate
	readonly hoursBeforeEditAvailable: number
	readonly hotelBookingLaunch: ReadonlyDate
	readonly eventStartDate: ReadonlyDate
	readonly eventEndDate: ReadonlyDate
	readonly earliestBirthDate: ReadonlyDate
	readonly minimumAge: number
	readonly allowedCountries: readonly (
		| 'AF' | 'AL' | 'DZ' | 'AS' | 'AD' | 'AO' | 'AI' | 'AQ' | 'AG' | 'AR' | 'AM' | 'AW' | 'AU' | 'AT' | 'AZ' | 'BS' | 'BH' | 'BD' | 'BB' | 'BY' | 'BE' | 'BZ'
		| 'BJ' | 'BM' | 'BT' | 'BO' | 'BA' | 'BW' | 'BV' | 'BR' | 'IO' | 'BN' | 'BG' | 'BF' | 'BI' | 'KH' | 'CM' | 'CA' | 'CV' | 'KY' | 'CF' | 'TD' | 'CL' | 'CN'
		| 'CX' | 'CC' | 'CO' | 'KM' | 'CG' | 'CD' | 'CK' | 'CR' | 'CI' | 'HR' | 'CU' | 'CY' | 'CZ' | 'DK' | 'DJ' | 'DM' | 'DO' | 'EC' | 'EG' | 'SV' | 'GQ' | 'ER'
		| 'EE' | 'ET' | 'FK' | 'FO' | 'FJ' | 'FI' | 'FR' | 'GF' | 'PF' | 'TF' | 'GA' | 'GM' | 'GE' | 'DE' | 'GH' | 'GI' | 'GR' | 'GL' | 'GD' | 'GP' | 'GU' | 'GT'
		| 'GN' | 'GW' | 'GY' | 'HT' | 'HM' | 'VA' | 'HN' | 'HK' | 'HU' | 'IS' | 'IN' | 'ID' | 'IR' | 'IQ' | 'IE' | 'IL' | 'IT' | 'JM' | 'JP' | 'JO' | 'KZ' | 'KE'
		| 'KI' | 'KP' | 'KR' | 'KW' | 'KG' | 'LA' | 'LV' | 'LB' | 'LS' | 'LR' | 'LY' | 'LI' | 'LT' | 'LU' | 'MO' | 'MG' | 'MW' | 'MY' | 'MV' | 'ML' | 'MT' | 'MH'
		| 'MQ' | 'MR' | 'MU' | 'YT' | 'MX' | 'FM' | 'MD' | 'MC' | 'MN' | 'MS' | 'MA' | 'MZ' | 'MM' | 'NA' | 'NR' | 'NP' | 'NL' | 'NC' | 'NZ' | 'NI' | 'NE' | 'NG'
		| 'NU' | 'NF' | 'MK' | 'MP' | 'NO' | 'OM' | 'PK' | 'PW' | 'PS' | 'PA' | 'PG' | 'PY' | 'PE' | 'PH' | 'PN' | 'PL' | 'PT' | 'PR' | 'QA' | 'RE' | 'RO' | 'RU'
		| 'RW' | 'SH' | 'KN' | 'LC' | 'PM' | 'VC' | 'WS' | 'SM' | 'ST' | 'SA' | 'SN' | 'SC' | 'SL' | 'SG' | 'SK' | 'SI' | 'SB' | 'SO' | 'ZA' | 'GS' | 'ES' | 'LK'
		| 'SD' | 'SR' | 'SJ' | 'SZ' | 'SE' | 'CH' | 'SY' | 'TW' | 'TJ' | 'TZ' | 'TH' | 'TL' | 'TG' | 'TK' | 'TO' | 'TT' | 'TN' | 'TR' | 'TM' | 'TC' | 'TV' | 'UG'
		| 'UA' | 'AE' | 'GB' | 'US' | 'UM' | 'UY' | 'UZ' | 'VU' | 'VE' | 'VN' | 'VG' | 'VI' | 'WF' | 'EH' | 'YE' | 'ZM' | 'ZW' | 'AX' | 'BQ' | 'CW' | 'GG' | 'IM'
		| 'JE' | 'ME' | 'BL' | 'MF' | 'RS' | 'SX' | 'SS' | 'XK'
	)[]
	readonly ticketLevels: Readonly<Record<TicketLevel, TicketLevelConfig<keyof AddonConfigs & string>>>
	readonly addons: { [K in keyof AddonConfigs]: AddonConfig<AddonConfigs[K]> }
	readonly rooms: readonly RoomConfig[]
	readonly apis: {
		readonly authsrv: {
			readonly url: string
			readonly appName: string
		}
		readonly attsrv: {
			readonly url: string
		}
		readonly paysrv: {
			readonly url: string
		}
	}
	readonly websiteLinks: {
		readonly privacyStatement: string
		readonly imprint: string
		readonly policies: string
		readonly hotelInfo: string
		readonly terms: string
		readonly rules: string
		readonly waiver: string
		readonly contact: string
	}
}

export const checkConfig = <
	TicketLevel extends string,
	AddonConfigs extends Readonly<Record<string, unknown>>,
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
>(config: Config<TicketLevel, AddonConfigs>) => config
