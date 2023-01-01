import { ajax } from 'rxjs/ajax'
import config from '~/config'
/* eslint-disable camelcase */
import { RegistrationInfo } from '~/state/models/register'

export interface AttendeeDto {
	readonly id: number | null
	readonly nickname: string
	readonly first_name: string
	readonly last_name: string
	readonly street: string
	readonly zip: string
	readonly city: string
	readonly country: string // DE
	readonly country_badge: string // will change soon
	readonly state: string | null
	readonly email: string
	readonly phone: string
	readonly telegram: string | null // @Username
	readonly partner: string | null
	readonly birthday: string // 1972-11-06
	readonly gender: string | null // always set to 'notprovided'
	readonly pronouns: string | null
	readonly tshirt_size: string | null
	readonly flags: string // anon,ev
	readonly options: string // art,anim,music,suit
	readonly packages: string // room-none,attendance,sponsor
	readonly user_comments: string | null
}

export interface AttendeeIdListDto {
	readonly ids: readonly number[]
}

export interface CountdownDto {
	readonly countdown: number
}


const attendeeDtoFromRegistrationInfo = (registrationInfo: RegistrationInfo): AttendeeDto => ({
	id: null, // not used when submitting attendee data, contains badge number when reading them
	nickname: registrationInfo.personalInfo.nickname,
	first_name: registrationInfo.personalInfo.firstName,
	last_name: registrationInfo.personalInfo.lastName,
	street: registrationInfo.contactInfo.street,
	zip: registrationInfo.contactInfo.postalCode,
	city: registrationInfo.contactInfo.city,
	country: registrationInfo.contactInfo.country,
	country_badge: registrationInfo.personalInfo.spokenLanguages[0].toUpperCase(),
	email: registrationInfo.contactInfo.email,
	phone: registrationInfo.contactInfo.phoneNumber,
	telegram: registrationInfo.contactInfo.telegramUsername,
	partner: null, // unused by EF
	state: registrationInfo.contactInfo.stateOrProvince, // optional, may be null
	birthday: '1995-02-15',
	gender: 'notprovided',
	pronouns: registrationInfo.personalInfo.pronouns,
	tshirt_size: registrationInfo.ticketLevel.addons.tshirt.size,
	flags: 'hc,anon', // hc = wheelchair, anon = do not use name
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
	packages: 'room-none,attendance,stage', // the choices made regarding day guest/full, sponsorship etc.
	user_comments: registrationInfo.optionalInfo.comments,
})

/*
 * GET /countdown checks if registration is open, or when it will open, checking that the user is logged in in the process.
 *
 * Replies with either a CountdownDto and http status 200, or ErrorDto with message "auth.unauthorized" and http status 401.
 *
 * If the countdown dto contains countdown = 0, the reg is open and the send button should be available.
 *
 * This is also the performance-optimal way to check that a user is logged in, and determine whether the user will be able
 * to submit a new registration at this point in time.
 *
 * 401: The user is not correctly logged in, or the token has expired, and you need to
 * redirect the user to the auth start, possibly setting some return URL as dropoff so the user can return to the current place,
 * which should then check this endpoint again.
 *
 * This endpoint is optimized in the backend for high traffic, so it is safe to call during initial reg.
 */
export const registrationCountdownCheck = () => ajax<CountdownDto>({
	url: `${config.apis.attsrv.url}/countdown`,
	method: 'GET',
	crossDomain: true,
	withCredentials: true,
})

/*
 * POST /attendees creates a new registration.
 *
 * Replies with the resource location in the location header (ending in the assigned badge number), or an ErrorDto.
 *
 * 201: You should communicate the assigned badge number to the user, so they know they successfully registered.
 *
 * 400: This indicates a bug in this app because any validation errors should have been caught during field validation.
 * The ErrorDto's details field will contain english language messages that describe the error in detail.
 * It is important to communicate the ErrorDto's requestid field to the user, so they can give it to us, so we can look in the logs.
 *
 * 401: The user's token has expired, and you need to redirect them to the auth start to refresh it.
 *
 * 409: Duplicate (same nickname + email + zip code).
 *
 * 500: It is important to communicate the ErrorDto's requestid field to the user, so they can give it to us, so we can look in the logs.
 *
 * This endpoint is optimized in the backend for high traffic, so it is safe to call during initial reg.
 */
export const submitRegistration = (registrationInfo: RegistrationInfo) => ajax({
	url: `${config.apis.attsrv.url}/attendees`,
	method: 'POST',
	crossDomain: true,
	withCredentials: true,
	body: attendeeDtoFromRegistrationInfo(registrationInfo),
})

/*
 * GET /attendees obtains the badge numbers of the registrations owned by the current user.
 *
 * Returns AttendeeIdListDto and status 200, or ErrorDto and 401, 404, 500.
 *
 * 401: The user's token has expired, and you need to redirect them to the auth start to refresh it.
 * 404: This user has no registrations.
 * 500: It is important to communicate the ErrorDto's requestid field to the user, so they can give it to us, so we can look in the logs.
 *
 * This endpoint should be avoided during initial reg, as it entails a database select.
 */
export const findMyRegistrations = () => ajax<AttendeeIdListDto>({
	url: `${config.apis.attsrv.url}/attendees`,
	method: 'GET',
	crossDomain: true,
	withCredentials: true,
})

/*
 * GET /attendees/{id} obtains the data for an attendee. Used to load an attendee during edit mode.
 *
 * id should come from the list returned by findMyRegistrations. Then a 400, 403, 404 should not occur.
 *
 * Returns AttendeeDto and status 200, or ErrorDto and an error status.
 *
 * 401: The user's token has expired, and you need to redirect them to the auth start to refresh it.
 * 500: It is important to communicate the ErrorDto's requestid field to the user, so they can give it to us, so we can look in the logs.
 */
export const loadRegistration = (id: number) => ajax<AttendeeDto>({
	url: `${config.apis.attsrv.url}/attendees/${id}`,
	method: 'GET',
	crossDomain: true,
	withCredentials: true,
})

/*
 * PUT /attendees/{id} overwrites the data for an attendee. Used during edit mode.
 *
 * id should come from the list returned by findMyRegistration. Then a 403, 404 should not occur.
 *
 * 400: This indicates a bug in this app because any validation errors should have been caught during field validation.
 * The ErrorDto's details field will contain english language messages that describe the error in detail.
 * It is important to communicate the ErrorDto's requestid field to the user, so they can give it to us, so we can look in the logs.
 *
 * 401: The user's token has expired, and you need to redirect them to the auth start to refresh it.
 *
 * 409: this update would lead to a duplicate registration (same nickname + email + zip code). This error
 * should be communicated to the user.
 *
 * 500: It is important to communicate the ErrorDto's requestid field to the user, so they can give it to us, so we can look in the logs.
 */
export const updateRegistration = (id: number, registrationInfo: RegistrationInfo) => ajax({
	url: `${config.apis.attsrv.url}/attendees/${id}`,
	method: 'PUT',
	crossDomain: true,
	withCredentials: true,
	body: attendeeDtoFromRegistrationInfo(registrationInfo),
})
