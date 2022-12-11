/*
 * A layout that's common to all funnel pages.
 * Features a header that can be passed as the `headerContent` prop and a footer showing navigation buttons,
 * of which the "back" button will be invisible if `isFirstPage` is true.
 */

import styled from '@emotion/styled'
import { Button, Page } from '@eurofurence/reg-component-library'
import { Localized } from '@fluent/react'
import { navigate } from '@reach/router'
import type { ReadonlyReactNode } from '~/util/readonly-types'

const Footer = styled.footer`
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

const Link = styled.a`
	cursor: pointer;
`

export interface CommonFunnelLayoutProps {
	readonly children: ReadonlyReactNode
	readonly header?: ReadonlyReactNode
	readonly isFirstPage?: boolean
	readonly isLastPage?: boolean
	readonly onNext: () => void
}

const CommonFunnelLayout = ({ children, header: headerContent, isFirstPage = false, isLastPage = false, onNext }: CommonFunnelLayoutProps) => <Page>
	<header>
		{headerContent}
	</header>
	{children}
	<Footer>
		<Nav>
			<Localized id={isLastPage ? 'register-navigation-finish' : 'register-navigation-next'}><Button onClick={onNext}>Continue</Button></Localized>
			{!isFirstPage ? <Localized id="register-navigation-back"><Link onClick={() => navigate(-1)}>Go back</Link></Localized> : null}
		</Nav>
	</Footer>
</Page>

export default CommonFunnelLayout
