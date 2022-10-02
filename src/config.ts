import StandardRoomImage from '~/images/rooms/standard_room.inline.svg'
import DeluxeRoomImage from '~/images/rooms/deluxe_room.inline.svg'
import JuniorSuiteImage from '~/images/rooms/junior_suite.inline.svg'
import DeluxeSuiteImage from '~/images/rooms/suite_deluxe.inline.svg'

export default {
	eventName: 'Eurofurence',
	registrationLaunch: new Date('2022-01-21T12:30:23+02:00'),
	registrationExpirationDate: new Date('2022-01-31'),
	eventStartDate: new Date('2022-08-24'),
	eventEndDate: new Date('2022-08-28'),
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
} as const
