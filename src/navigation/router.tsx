import { Router, Redirect } from '@reach/router'
import NotFoundPage from '~/pages/404'
import { IndexPage } from '~/pages/home'
import RegisterPage from '~/pages/register'
import Ticket from '~/components/funnels/funnels/register/steps/ticket'
import Personal from '~/components/funnels/funnels/register/steps/personal'
import Contact from '~/components/funnels/funnels/register/steps/contact'
import Optional from '~/components/funnels/funnels/register/steps/optional'

import * as ROUTES from './routes'

export const EFRouter = () =>
	<IndexPage />

export const RegisterRouter = () =>
	<Router basepath="/register">
		<Ticket default path={`/${ROUTES.REGISTER_TICKET}/*`} />
		<Personal path={`/${ROUTES.REGISTER_PERSONAL}`} />
		<Contact path={`/${ROUTES.REGISTER_CONTACT}`} />
		<Optional path={`/${ROUTES.REGISTER_OPTIONAL}`} />
	</Router>
