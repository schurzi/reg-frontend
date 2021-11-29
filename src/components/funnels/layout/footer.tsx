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
