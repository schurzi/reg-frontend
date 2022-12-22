/* eslint-disable max-len */

import StandardRoomImage from '~/images/rooms/standard_room.inline.svg'
import DeluxeRoomImage from '~/images/rooms/deluxe_room.inline.svg'
import JuniorSuiteImage from '~/images/rooms/junior_suite.inline.svg'
import DeluxeSuiteImage from '~/images/rooms/suite_deluxe.inline.svg'

export default {
	eventName: 'Eurofurence',
	registrationLaunch: new Date('2023-01-21T12:30:23+02:00'),
	registrationExpirationDate: new Date('2023-01-31'),
	hotelBookingLaunch: new Date('2023-01-28T12:30:23+02:00'),
	eventStartDate: new Date('2023-08-02'),
	eventEndDate: new Date('2023-08-06'),
	earliestBirthDate: new Date('1901-01-01'),
	minimumAge: 18,
	allowedCountries: ['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MK', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW', 'XK'],
	stagePassPrice: 5,
	tshirtPrice: 20,
	tshirtSizes: ['S', 'M', 'L', 'XL', 'XXL'],
	ticketLevels: [
		{
			id: 'standard',
			prices: {
				full: 90,
				day: 25,
			},
		},
		{
			id: 'sponsor',
			prices: {
				full: 155,
				day: 45,
			},
		},
		{
			id: 'super-sponsor',
			prices: {
				full: 250,
				day: 125,
			},
		},
	],
	rooms: [
		{ id: 'standard', price: 140, image: StandardRoomImage },
		{ id: 'deluxe', price: 160, image: DeluxeRoomImage },
		{ id: 'junior-suite', price: 198, image: JuniorSuiteImage },
		{ id: 'deluxe-suite', price: 228, image: DeluxeSuiteImage },
	],
	apis: {
		// can we discover the base path so the URLs are correct even in the presence of a path prefix?
		authsrv: {
			// this could be '/some-secret-prefix/authsrv', if our app is under '/some-secret-prefix/app' in the testing environment
			url: '/authsrv/v1',
			appName: 'registration-system',
		},
		attsrv: {
			url: '/attsrv/api/rest/v1',
		},
		paysrv: {
			url: '/paysrv/api/rest/v1',
		},
	},
	websiteLinks: {
		// these two links need to be in the footer bar on each page
		privacyStatement: 'https://help.eurofurence.org/legal/privacy',
		imprint: 'https://help.eurofurence.org/legal/imprint',
		// further links we may need
		policies: 'https://www.eurofurence.org/EF27/policies',
		hotelInfo: 'https://www.eurofurence.org/EF27/hotel',
		terms: 'https://help.eurofurence.org/legal/terms',
		rules: 'https://help.eurofurence.org/legal/roc',
		waiver: 'https://help.eurofurence.org/legal/liability',
		contact: 'https://help.eurofurence.org/contact',
		// the cookie statement should probably be part of the registration system
		//
		// text: something like:
		//   This registration system uses a cookie to identify you while you are logged in.
		//   As soon as you log out, the cookie is deleted. Even if you do not log out explicitly, the cookie expires after a few hours.
		//   We do not employ any third party cookies or tracking solutions.
	},
} as const
