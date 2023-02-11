import { useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import '@eurofurence/reg-component-library/dist/index.css'
import { ReadonlyDate, ReadonlyReactNode } from '~/util/readonly-types'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { getUserInfo } from '~/state/selectors/auth'
import { LookupUserInfo } from '~/state/actions/auth'
import { Splash } from '@eurofurence/reg-component-library'
import { StaticImage } from 'gatsby-plugin-image'
import { Localized } from '@fluent/react'

export interface LayoutProps {
	readonly deadline?: ReadonlyDate
	readonly children: ReadonlyReactNode
}

const LoginGuard = ({ children }: { readonly children: ReadonlyReactNode }) => {
	const userInfo = useAppSelector(getUserInfo())
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(LookupUserInfo.create(undefined))
	}, [])

	return <>
		{userInfo === undefined
			? 'Loading...'
			: userInfo.emailVerified
				? children
				: <Splash image={<StaticImage src="../images/con-cats/ticket-types/day.png" alt=""/>}>
					<Localized id="auth-unverified-title"><h1>You have not verified your email address.</h1></Localized>
					<Localized id="auth-unverified-message"><p>Please click the verification link in the email you received before registering!</p></Localized>
				</Splash>}
	</>
}

const Layout = ({ deadline, children }: LayoutProps) => <>
	<Header deadline={deadline}/>
	<LoginGuard>{children}</LoginGuard>
	<Footer/>
</>

export default Layout
