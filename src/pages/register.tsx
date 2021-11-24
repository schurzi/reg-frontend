/** @jsxImportSource @emotion/react */

import { Router } from '@reach/router'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Ticket from '../components/register/steps/ticket'
import TicketType from '../components/register/steps/ticket/type'
import TicketDay from '../components/register/steps/ticket/day'
import TicketLevel from '../components/register/steps/ticket/level'
import Personal from '../components/register/steps/personal'
import Contact from '../components/register/steps/contact'
import Optional from '../components/register/steps/optional'

const RegisterPage = () => <Layout>
	<SEO title="Register" />
	<Router basepath="/register">
		<Ticket path="ticket">
			<TicketType path="type"/>
			<TicketDay path="day"/>
			<TicketLevel path="level"/>
		</Ticket>
		<Personal path="personal-info"/>
		<Contact path="contact-info"/>
		<Optional path="optional-info"/>
	</Router>
</Layout>

export default RegisterPage
