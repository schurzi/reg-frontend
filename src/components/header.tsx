import { css } from '@emotion/react'
import { Localized } from '@fluent/react'
import { interval } from 'rxjs'
import * as O from 'rxjs/operators'
import { useObservableState, useObservable } from 'observable-hooks'
import { intervalToDuration } from 'date-fns/fp'
import brandImg from '~/images/brand.svg'
import { NavBar, Display, Dropdown } from '@eurofurence/reg-component-library'
import config from '~/config'
import { ReadonlyDate } from '~/util/readonly-types'

const CLOCK_UPDATE_DELAY = 1000

interface ClockProps {
	readonly deadline?: ReadonlyDate
}

const Clock = ({ deadline }: ClockProps) => {
	if (deadline === undefined) {
		return null
	} else {
		const getTimeRemaining = () => intervalToDuration({ start: new Date(), end: deadline })

		const tick$ = useObservable(() => interval(CLOCK_UPDATE_DELAY).pipe(O.map(getTimeRemaining)), [])
		const timeRemaining = useObservableState(tick$, getTimeRemaining())

		return <section id="clock" css={css`
			display: flex;

			& > section:not(:first-of-type) {
				margin-left: 0.8rem;
			}
		`}>
			<Localized id="header-clock-component-months" attrs={{ caption: true }}>
				<Display caption="Months" content={timeRemaining.months!.toString()} size={2} padding="0"/>
			</Localized>
			<Localized id="header-clock-component-days" attrs={{ caption: true }}>
				<Display caption="Days" content={timeRemaining.days!.toString()} size={2} padding="0"/>
			</Localized>
			<Localized id="header-clock-component-hours" attrs={{ caption: true }}>
				<Display caption="Hours" content={timeRemaining.hours!.toString()} size={2} padding="0"/>
			</Localized>
			<Localized id="header-clock-component-minutes" attrs={{ caption: true }}>
				<Display caption="Minutes" content={timeRemaining.minutes!.toString()} size={2} padding="0"/>
			</Localized>
			<Localized id="header-clock-component-seconds" attrs={{ caption: true }}>
				<Display caption="Seconds" content={timeRemaining.seconds!.toString()} size={2} padding="0"/>
			</Localized>
		</section>
	}
}

export interface HeaderProps {
	readonly deadline?: ReadonlyDate
}

const Header = ({ deadline }: HeaderProps) => {
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
		<Clock deadline={deadline} />
		<Dropdown><Localized id="header-dropdown-my-account">My account</Localized></Dropdown>
		<Dropdown><Localized id="header-dropdown-language">Language</Localized></Dropdown>
	</NavBar>
}

export default Header
