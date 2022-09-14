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
		{ id: 'standard', price: 140, image: 'standard_room.svg' },
		{ id: 'deluxe', price: 160, image: 'deluxe_room.svg' },
		{ id: 'junior-suite', price: 198, image: 'junior_suite.svg' },
		{ id: 'deluxe-suite', price: 228, image: 'suite_deluxe.svg' },
	],
} as const
