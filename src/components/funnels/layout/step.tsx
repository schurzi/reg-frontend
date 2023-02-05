/*
 * A layout that's common to all funnel step pages.
 * Features a header that can be passed as the `headerContent` prop and a footer showing navigation buttons,
 * of which the "back" button will be invisible if `isFirstPage` is true.
 */

import styled from '@emotion/styled'
import { Button, Page } from '@eurofurence/reg-component-library'
import { Localized } from '@fluent/react'
import { navigate } from 'gatsby'
import { useAppSelector } from '~/hooks/redux'
import { isEditMode } from '~/state/selectors/register'
import type { ReadonlyReactNode } from '~/util/readonly-types'

const Header = styled.header`
	margin-bottom: 3em;
`

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
	readonly isFirstPage?: boolean
	readonly isLastPage?: boolean
	readonly onNext: () => void
	readonly showBack?: boolean
}

const StepFunnelLayout = ({ children, header: headerContent, isFirstPage = false, isLastPage = false, onNext, showBack = false }: StepFunnelLayoutProps) => {
	const isEdit = useAppSelector(isEditMode())

	return <Page>
		<Header>
			{headerContent}
		</Header>
		{children}
		<Footer>
			<Nav>
				{isEdit && isLastPage ? null : <Localized id={isEdit ? 'register-navigation-update' : isLastPage ? 'register-navigation-finish' : 'register-navigation-next'}>
					<Button onClick={onNext}>Continue</Button>
				</Localized>}
				{isEdit && isLastPage || isFirstPage && !showBack ? null : <Localized id="register-navigation-back">
					<a onClick={() => navigate(-1)}>Go back</a>
				</Localized>}
			</Nav>
		</Footer>
	</Page>
}

export default StepFunnelLayout
