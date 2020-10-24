/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useStaticQuery, graphql } from 'gatsby'
import { interval } from 'rxjs'
import * as O from 'rxjs/operators'
import { useObservableState, useObservable } from 'observable-hooks'
import { DateTime, Duration } from 'luxon'
import brandImg from '../images/brand.svg'
import { NavBar, Display } from '@eurofurence/reg-component-library'

const CLOCK_UPDATE_DELAY = 1000

const Clock = ({ timeRemaining }: { timeRemaining: Duration }) => <section id="clock" css={css`
	display: flex;

	& > section:not(:first-of-type) {
		margin-left: 0.8rem;
	}
`}>
	<Display caption="Months" content={timeRemaining.months.toString()} size={2} padding="0"/>
	<Display caption="Days" content={timeRemaining.days.toString()} size={2} padding="0"/>
	<Display caption="Hours" content={timeRemaining.hours.toString()} size={2} padding="0"/>
	<Display caption="Minutes" content={timeRemaining.minutes.toString()} size={2} padding="0"/>
	<Display caption="Seconds" content={timeRemaining.seconds.toString()} size={2} padding="0"/>
</section>

const Header = () => {
	const { site: { siteMetadata: { eventName, registrationLaunch } } } = useStaticQuery(graphql`
		query SiteEventNameQuery {
			site {
				siteMetadata {
					eventName
					registrationLaunch
				}
			}
		}
	`)
	const getTimeRemaining = () => DateTime.fromISO(registrationLaunch).diffNow(['months', 'days', 'hours', 'minutes', 'seconds'])

	const tick$ = useObservable(() => interval(CLOCK_UPDATE_DELAY).pipe(O.map(getTimeRemaining)), [])
	const timeRemaining = useObservableState(tick$, getTimeRemaining())

	return <NavBar>
		<section id="title" css={css`
			flex: 1;
			font-family: Rubik;
			font-size: 3.6rem;
		`}>
			<img src={brandImg} css={css`
				height: 1.1ch;
				margin-right: 1.6rem;
			`}/>
			{eventName}
		</section>
		<Clock timeRemaining={timeRemaining} />
	</NavBar>
}

export default Header
