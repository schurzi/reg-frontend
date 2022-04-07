import { Router } from '@reach/router'
import NotFoundPage from '~/pages/404'
import { IndexPage } from '~/pages/home'
import RegisterPage from '~/pages/register'
import HotelBookingPage from '~/pages/hotel-booking'
import Ticket from '~/components/funnels/funnels/register/steps/ticket'
import TicketType from '~/components/funnels/funnels/register/steps/ticket/type'
import TicketDay from '~/components/funnels/funnels/register/steps/ticket/day'
import TicketLevel from '~/components/funnels/funnels/register/steps/ticket/level'
import Personal from '~/components/funnels/funnels/register/steps/personal'
import Contact from '~/components/funnels/funnels/register/steps/contact'
import Optional from '~/components/funnels/funnels/register/steps/optional'
import Room from '~/components/funnels/funnels/hotel-booking/steps/room'
import Guests from '~/components/funnels/funnels/hotel-booking/steps/guests'
import AdditionalInfo from '~/components/funnels/funnels/hotel-booking/steps/additional-info'
import Email from '~/components/funnels/funnels/hotel-booking/steps/email'

import * as ROUTES from './routes'

export const EFRouter = () => (
	<Router>
		<NotFoundPage default />
		<IndexPage path={ROUTES.HOME} />
		<RegisterPage path={ROUTES.REGISTER} />
		<HotelBookingPage path={ROUTES.HOTEL_BOOKING} />
	</Router>
)

export const RegisterRouter = () => (
	<Router basepath="/register">
		<Ticket path={ROUTES.REGISTER_TICKET}>
			<TicketType path={ROUTES.REGISTER_TICKET_TYPE} />
			<TicketDay path={ROUTES.REGISTER_TICKET_DAY} />
			<TicketLevel path={ROUTES.REGISTER_TICKET_LEVEL} />
		</Ticket>
		<Personal path={ROUTES.REGISTER_PERSONAL} />
		<Contact path={ROUTES.REGISTER_CONTACT} />
		<Optional path={ROUTES.REGISTER_OPTIONAL} />
	</Router>
)

export const HotelBookingRouter = () => (
	<Router basepath="/hotel-booking">
		<Room path={ROUTES.HOTEL_BOOKING_ROOM} />
		<Guests path={ROUTES.HOTEL_BOOKING_GUESTS} />
		<AdditionalInfo path={ROUTES.HOTEL_BOOKING_ADDITIONAL_INFO} />
		<Email path={ROUTES.HOTEL_BOOKING_EMAIL} />
	</Router>
)
