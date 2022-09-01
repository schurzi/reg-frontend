import { css } from '@emotion/react'
import { Localized } from '@fluent/react'
import { interval } from 'rxjs'
import * as O from 'rxjs/operators'
import { useObservableState, useObservable } from 'observable-hooks'
import { Duration } from 'date-fns'
import { intervalToDuration } from 'date-fns/fp'
import brandImg from '~/images/brand.svg'
import { NavBar, Display, Dropdown } from '@eurofurence/reg-component-library'
import config from '~/config'
import type { DeepReadonly } from 'ts-essentials'

const CLOCK_UPDATE_DELAY = 1000

const Clock = ({ timeRemaining }: { readonly timeRemaining: DeepReadonly<Duration> }) => <section id="clock" css={css`
	display: flex;

	& > section:not(:first-of-type) {
		margin-left: 0.8rem;
	}
`}>
	<Display caption="Months" content={timeRemaining.months!.toString()} size={2} padding="0"/>
	<Display caption="Days" content={timeRemaining.days!.toString()} size={2} padding="0"/>
	<Display caption="Hours" content={timeRemaining.hours!.toString()} size={2} padding="0"/>
	<Display caption="Minutes" content={timeRemaining.minutes!.toString()} size={2} padding="0"/>
	<Display caption="Seconds" content={timeRemaining.seconds!.toString()} size={2} padding="0"/>
</section>

const Header = () => {
	const getTimeRemaining = () => intervalToDuration({ start: new Date(), end: config.registrationLaunch })

	const tick$ = useObservable(() => interval(CLOCK_UPDATE_DELAY).pipe(O.map(getTimeRemaining)), [])
	const timeRemaining = useObservableState(tick$, getTimeRemaining())

	return <NavBar>
		<section id="title" css={css`
			flex: 1;
			font-family: Manrope;
			font-size: 3.6rem;
		`}>
			<img src={brandImg} css={css`
				height: 1.1ch;
				margin-right: 1.6rem;
			`}/>
			{config.eventName}
		</section>
		<Clock timeRemaining={timeRemaining} />
		<Dropdown><Localized id="header-dropdown-my-account">My account</Localized></Dropdown>
		<Dropdown><Localized id="header-dropdown-language">Language</Localized></Dropdown>
	</NavBar>
}

export default Header
