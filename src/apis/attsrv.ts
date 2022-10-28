import { ajax } from 'rxjs/ajax'
import config from '~/config'
/* eslint-disable camelcase */
import { RegistrationInfo } from '~/state/models/register'

export const submitRegistration = (registrationInfo: RegistrationInfo) => ajax({
	url: `${config.apis.attsrv.url}/attendees`,
	method: 'POST',
	crossDomain: true,
	withCredentials: true,
	body: {
		nickname: registrationInfo.personalInfo.nickname,
		first_name: registrationInfo.personalInfo.firstName,
		last_name: registrationInfo.personalInfo.lastName,
		street: registrationInfo.contactInfo.street,
		zip: registrationInfo.contactInfo.postalCode,
		city: registrationInfo.contactInfo.city,
		country: registrationInfo.contactInfo.country.toUpperCase(),
		country_badge: registrationInfo.personalInfo.spokenLanguages[0].toUpperCase(),
		email: registrationInfo.contactInfo.email,
		phone: registrationInfo.contactInfo.phoneNumber,
		// telegram: "string",
		birthday: '1995-02-15',
		gender: 'notprovided',
		pronouns: 'they/them',
		tshirt_size: registrationInfo.ticketLevel.addons.tshirt.size,
		options: Object
			.entries(registrationInfo.optionalInfo.notifications)
			.filter(([, enabled]) => enabled)
			.map(([id]) => ({
				animation: 'anim',
				art: 'art',
				music: 'music',
				fursuiting: 'suit',
			}[id]))
			.join(','),
		packages: 'room-none,attendance,stage',
		user_comments: registrationInfo.optionalInfo.comments,
	},
})
