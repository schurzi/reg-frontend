import { Router } from '@reach/router'
import NotFoundPage from '../pages/404';
import { IndexPage } from '../pages/home';
import RegisterPage, { Contact, Optional, Personal, Ticket, TicketDay, TicketLevel, TicketType } from '../pages/register';

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
);
