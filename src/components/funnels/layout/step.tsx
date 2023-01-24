/*
 * A layout that's common to all funnel step pages.
 * Features a header that can be passed as the `headerContent` prop and a footer showing navigation buttons,
 * of which the "back" button will be invisible if `isFirstPage` is true.
 */

import styled from '@emotion/styled'
import { Button, Page } from '@eurofurence/reg-component-library'
import { Localized } from '@fluent/react'
import { navigate } from 'gatsby'
import type { ReadonlyReactNode } from '~/util/readonly-types'
import { useFunnelStep } from '~/components/funnels/funnel-step'

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

export interface StepFunnelLayoutProps {
	readonly children: ReadonlyReactNode
	readonly header?: ReadonlyReactNode
	readonly onNext: () => void
}

const StepFunnelLayout = ({ children, header: headerContent, onNext }: StepFunnelLayoutProps) => {
	const { current, total, isSubstep, isEditMode } = useFunnelStep()

	const isFirstPage = current === 0
	const isLastPage = current === total - 1

	return <Page>
		<header>
			{headerContent}
		</header>
		{children}
		<Footer>
			<Nav>
				{isEditMode && isLastPage ? null : <Localized id={isEditMode ? 'register-navigation-update' : isLastPage ? 'register-navigation-finish' : 'register-navigation-next'}>
					<Button onClick={onNext}>Continue</Button>
				</Localized>}
				{(isEditMode && isLastPage) || (isFirstPage && !isSubstep) ? null : <Localized id="register-navigation-back">
					<a onClick={() => navigate(-1)}>Go back</a>
				</Localized>}
			</Nav>
		</Footer>
	</Page>
}

export default StepFunnelLayout
