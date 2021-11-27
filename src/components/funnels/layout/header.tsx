/** @jsxImportSource @emotion/react */

import { WizardProgressBar } from '@eurofurence/reg-component-library'
import { Localized } from '@fluent/react'

interface RegisterHeaderProps {
	readonly showWelcome: boolean
}

const Header = ({ showWelcome = false }: RegisterHeaderProps) =>
	<header>
		{!showWelcome ? null : <>
			<Localized id="register-header-title"><h1>Welcome to Eurofurence 2022!</h1></Localized>
			<Localized id="register-header-description">
				<p>
					We&apos;re very excited that you&apos;ve decided to join us for this confurence.
					Get ready for a fun couple of days with likeminded people and enjoy all the activities and events that we&apos;ve got lined up for you this year.
				</p>
			</Localized>
		</>}
		<WizardProgressBar steps={['Order', 'Personal information', 'Contact information', 'Optional information', 'Checkout']} currentStep={1}/>
	</header>

export default Header
