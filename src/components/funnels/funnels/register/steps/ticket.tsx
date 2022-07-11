import { ReactNode } from 'react'
import { RouteComponentProps, Router } from '@reach/router'
import TicketType from './ticket/type';
import TicketDay from './ticket/day';
import TicketLevel from './ticket/level';
import * as ROUTES from '~/navigation/routes'

const Ticket = (_: RouteComponentProps) => {
	return (
			<Router basepath="/register/ticket">
				<TicketType default path={`/${ROUTES.REGISTER_TICKET_TYPE}`} />
				<TicketDay path={`/${ROUTES.REGISTER_TICKET_DAY}`} />
				<TicketLevel path={`/${ROUTES.REGISTER_TICKET_LEVEL}`} />
			</Router>
	);
};

export default Ticket
