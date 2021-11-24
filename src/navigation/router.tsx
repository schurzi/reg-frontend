import { Router } from '@reach/router'
import NotFoundPage from '../pages/404'
import { IndexPage } from '../pages/home'
import RegisterPage from '../pages/register'
import Ticket from '../components/register/steps/ticket'
import TicketType from '../components/register/steps/ticket/type'
import TicketDay from '../components/register/steps/ticket/day'
import TicketLevel from '../components/register/steps/ticket/level'
import Personal from '../components/register/steps/personal'
import Contact from '../components/register/steps/contact'
import Optional from '../components/register/steps/optional'

import * as ROUTES from './routes'

export const EFRouter = () => (
  <Router>
    <NotFoundPage default />
	<IndexPage path={ROUTES.HOME} />
	<RegisterPage path={ROUTES.REGISTER} />
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
