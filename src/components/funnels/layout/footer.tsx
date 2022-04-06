/*
 * The footer for all funnel layouts.
 * Features a navigation area with a "Continue" and a "Go back" button.
 *
 * Clicking "Continue" will raise the `onNext` event. Clicking "Go back" will just navigate to the previous page.
 */

import styled from '@emotion/styled'
import { Button } from '@eurofurence/reg-component-library'
import { Localized } from '@fluent/react'
import { navigate } from '@reach/router'

const Container = styled.footer`
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Nav = styled.nav`
	display: flex;
	align-items: center;
	column-gap: 22px;
`

export interface RegisterFooterProps {
	readonly canBack: boolean
	readonly onNext: () => void
}

const Footer = ({ canBack, onNext }: RegisterFooterProps) =>
	<Container>
		<Nav>
			<Localized id="register-navigation-next"><Button onClick={onNext}>Continue</Button></Localized>
			{canBack ? <Localized id="register-navigation-back"><a onClick={() => navigate(-1)}>Go back</a></Localized> : null}
		</Nav>
	</Container>

export default Footer
