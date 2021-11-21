/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Localized } from '@fluent/react'
import { Router, RouteComponentProps, Link, useMatch, navigate } from '@reach/router'
import { useForm } from 'react-hook-form'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TicketLevelCard from '../components/register/ticket-level-card'
import { Form, TextField, Checkbox, RadioSet, RadioItem, FieldSet, RadioGroup, RadioCard, WizardProgressBar, Select, Button, TextArea } from '@eurofurence/reg-component-library'
import langMap from 'langmap'
import { useCurrentLangKey } from '../localization'
import { until, last } from 'ramda'
import { DateTime } from 'luxon'
import { ReactNode } from 'react'
import { useSiteMetadata } from '../queries/site-metadata'

const steps = [
	'ticket',
	'personal-info',
	'contact-info',
	'optional-info',
]

const languageOptions = [...Object.entries(langMap)]
	.filter(([key]) => !key.includes('-'))
	.map(([value, names]) => ({ label: names.nativeName, value }))

const datesBetween = (start: DateTime, end: DateTime) =>
	until<DateTime[], DateTime[]>(days => last(days)!.equals(end), days => [...days, last(days)!.plus({ day: 1 })], [start])

const Header = () => {
	const match = useMatch('/register/:step')
	const stepIdx = match == null ? 0 : steps.indexOf(match.step)

	return <header>
		<Localized id="register-header-title"><h1>Welcome to Eurofurence 2022!</h1></Localized>
		<Localized id="register-header-description">
			<p>
				We&apos;re very excited that you&apos;ve decided to join us for this confurence.
				Get ready for a fun couple of days with likeminded people and enjoy all the activities and events that we&apos;ve got lined up for you this year.
			</p>
		</Localized>
		<WizardProgressBar steps={['Order', 'Personal information', 'Contact information', 'Optional information', 'Checkout']} currentStep={1+stepIdx}/>
	</header>
}

const Footer = () => {
	const match = useMatch('/register/:step')
	const stepIdx = match == null ? 0 : steps.indexOf(match.step)

	return <footer css={css`
		height: 100px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	`}>
		<nav css={css`
			display: flex;
			align-items: center;
			column-gap: 22px;
		`}>
			{stepIdx !== 0 ? <a onClick={() => navigate(-1)}>Go back</a> : null}
			{stepIdx !== steps.length - 1 ? <Button as={Link} to={`/register/${steps[stepIdx + 1]}`}>Continue</Button> : null}
		</nav>
		<p>Your information was last saved on Friday, August 5th 2022 at 16:31.</p>
	</footer>
}

const TicketType = (_: RouteComponentProps) => {
	const { register } = useForm()

	return <form>
		<RadioGroup name="ticketType">
			<div css={css`
				display: flex;
				gap: 20px;

				> * {
					flex: 1;
				}
			`}>
				<Localized id="register-ticket-type-day-label" attrs={{ label: true }}>
					<RadioCard label="Day ticket" value="day" height="346px" {...register('ticketType')}/>
				</Localized>
				<Localized id="register-ticket-type-full-label" attrs={{ label: true }}>
					<RadioCard label="Full convention" value="full" height="346px" {...register('ticketType')}/>
				</Localized>
			</div>
		</RadioGroup>
	</form>
}

const TicketDay = (_: RouteComponentProps) => {
	const { eventStartDate, eventEndDate } = useSiteMetadata()
	const langKey = useCurrentLangKey()
	const { register } = useForm()

	return <form>
		<RadioGroup name="ticketDay">
			<div css={css`
				display: grid;
				gap: 20px;
				grid: auto-flow 1fr / repeat(3, 1fr);
			`}>
				{datesBetween(DateTime.fromISO(eventStartDate), DateTime.fromISO(eventEndDate)).map(date =>
					<RadioCard key={date.toISODate()} label={date.setLocale(langKey).toLocaleString(DateTime.DATE_FULL)} value={date.toISODate()} {...register('ticketDay')}/>
				)}
			</div>
		</RadioGroup>
	</form>
}

const Ticket = ({ children }: RouteComponentProps<{ readonly children: ReactNode }>) => {
	return <>
		{children}
	</>
}

const TicketLevel = (_: RouteComponentProps) => {
	const { register } = useForm()
	const { ticketLevels, registrationExpirationDate } = useSiteMetadata()

	const expirationDate = DateTime.fromISO(registrationExpirationDate)

	return <form css={css`
		display: grid;
		gap: 20px;
		grid: auto-flow 1fr / repeat(3, 1fr);
	`}>
		<RadioGroup name="ticketLevel">
			{ticketLevels.map(({ id, price }) =>
				<Localized key={id} id={`register-ticket-level-card-${id}`} attrs={{ label: true, description: true, priceLabel: true }}>
					<TicketLevelCard id={id} price={price} expirationDate={expirationDate} label="Ticket level" priceLabel="A ticket" {...register('ticketLevel')}>A ticket level</TicketLevelCard>
				</Localized>
			)}
		</RadioGroup>
	</form>
}

const Personal = (_: RouteComponentProps) => {
	const { register } = useForm()

	return <Form>
		<Localized id="register-form-nickname" attrs={{ label: true, placeholder: true }}>
			<TextField label="Nickname" placeholder="Johnny_The_Sergal" {...register('nickname')}/>
		</Localized>
		<Localized id="register-form-first-name" attrs={{ label: true, placeholder: true }}>
			<TextField label="First name" placeholder="John" gridSpan={5} {...register('firstName')}/>
		</Localized>
		<Localized id="register-form-last-name" attrs={{ label: true, placeholder: true }}>
			<TextField label="Last name" placeholder="Doe" gridSpan={5} {...register('lastName')}/>
		</Localized>
		<Localized id="register-form-full-name-permission" attrs={{ label: true }}>
			<Checkbox label="I grant permission to use my full name in Eurofurence related media." {...register('fullNamePermission')}/>
		</Localized>
		<Localized id="register-form-name-on-badge" attrs={{ legend: true }}>
			<RadioSet name="nameOnBadge" legend="Name on badge">
				<Localized id="register-form-name-on-badge-real-name" attrs={{ label: true }}>
					<RadioItem label="Real name" value="real-name" {...register('nameOnBadge')}/>
				</Localized>
				<Localized id="register-form-name-on-badge-nickname" attrs={{ label: true }}>
					<RadioItem label="Nickname" value="nickname" {...register('nameOnBadge')}/>
				</Localized>
				<Localized id="register-form-name-on-badge-real-name-and-nickname" attrs={{ label: true }}>
					<RadioItem label="Real name + nickname" value="real-name-and-nickname" {...register('nameOnBadge')}/>
				</Localized>
			</RadioSet>
		</Localized>
		<Localized id="register-form-spoken-languages" attrs={{ label: true }}>
			<Select name="spoken-languages" label="Spoken languages" isMulti options={languageOptions}/>
		</Localized>
		<Localized id="register-form-gender" attrs={{ legend: true }}>
			<RadioSet name="gender" legend="Gender">
				<Localized id="register-form-gender-male" attrs={{ label: true }}>
					<RadioItem label="Male" value="male" {...register('gender')}/>
				</Localized>
				<Localized id="register-form-gender-female" attrs={{ label: true }}>
					<RadioItem label="Female" value="female" {...register('gender')}/>
				</Localized>
				<Localized id="register-form-gender-non-binary" attrs={{ label: true }}>
					<RadioItem label="Non-binary" value="non-binary" {...register('gender')}/>
				</Localized>
				<Localized id="register-form-gender-prefer-not-to-say" attrs={{ label: true }}>
					<RadioItem label="I prefer not to say" value="prefer-not-to-say" defaultChecked {...register('gender')}/>
				</Localized>
			</RadioSet>
		</Localized>
		<Localized id="register-form-accessibility" attrs={{ legend: true }}>
			<FieldSet legend="Accessibility">
				<Localized id="register-form-accessibility-wheelchair" attrs={{ label: true }}>
					<Checkbox label="Please accomodate my wheelchair (and me)." {...register('wheelchair')}/>
				</Localized>
			</FieldSet>
		</Localized>
	</Form>
}

const Contact = (_: RouteComponentProps) => {
	const { register } = useForm()

	return <Form>
		<Localized id="register-form-email" attrs={{ label: true, placeholder: true }}>
			<TextField label="Email address" placeholder="john.smith@email.com" gridSpan={7} {...register('email')}/>
		</Localized>
		<Localized id="register-form-phone-number" attrs={{ label: true, placeholder: true }}>
			<TextField label="Phone number" placeholder="+32 0 000 00 00" gridSpan={3} {...register('phoneNumber')}/>
		</Localized>
		<Localized id="register-form-street" attrs={{ label: true, placeholder: true }}>
			<TextField label="Street" placeholder="Pennylane 40" {...register('street')}/>
		</Localized>
		<Localized id="register-form-city" attrs={{ label: true, placeholder: true }}>
			<TextField label="City" placeholder="Zootopia" gridSpan={7} {...register('city')}/>
		</Localized>
		<Localized id="register-form-postal-code" attrs={{ label: true, placeholder: true }}>
			<TextField label="Postal code (ZIP)" placeholder="8888" gridSpan={3} {...register('postalCode')}/>
		</Localized>
		<Localized id="register-form-state-or-province" attrs={{ label: true, placeholder: true }}>
			<TextField label="State / Province" placeholder="Fur Valley" gridSpan={5} {...register('stateOrProvince')}/>
		</Localized>
		<Localized id="register-form-country" attrs={{ label: true, placeholder: true }}>
			<TextField label="Country" placeholder="Germany" gridSpan={5} {...register('country')}/>
		</Localized>
	</Form>
}

const Optional = (_: RouteComponentProps) => {
	const { register } = useForm()

	return <Form>
		<Localized id="register-form-notifications" attrs={{ legend: true }}>
			<FieldSet legend="I would like to receive event information and announcements about">
				<Localized id="register-form-notifications-art" attrs={{ label: true }}>
					<Checkbox label="Art" {...register('notificatons.art')}/>
				</Localized>
				<Localized id="register-form-accessibility-animation" attrs={{ label: true }}>
					<Checkbox label="Animation" {...register('notificatons.animation')}/>
				</Localized>
				<Localized id="register-form-accessibility-music" attrs={{ label: true }}>
					<Checkbox label="Music" {...register('notificatons.music')}/>
				</Localized>
				<Localized id="register-form-accessibility-fursuiting" attrs={{ label: true }}>
					<Checkbox label="Fursuiting" {...register('notificatons.fursuiting')}/>
				</Localized>
			</FieldSet>
		</Localized>
		<Localized id="register-form-comments" attrs={{ label: true, placeholder: true }}>
			<TextArea label="Comments" placeholder={'I would like to know more about ...'} {...register('comments')}/>
		</Localized>
	</Form>
}

const RegisterPage = () => <Layout>
	<SEO title="Register" />
	<Header/>
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
	<Footer/>
</Layout>

export default RegisterPage
