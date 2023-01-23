import { RegisterRouter } from '~/navigation/router'
import Layout from '~/components/layout'
import SEO from '~/components/seo'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import NotOpenYet from '~/components/funnels/funnels/register/not-open-yet'
import FunnelErrorGuard from '~/components/funnels/error-guard'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { isRegistrationOpen } from '~/state/selectors/register'
import { useEffect } from 'react'
import { CheckCountdown } from '~/state/actions/register'

export const Head = () => <SEO title="Register" />

const Content = () => {
	const isOpen = useAppSelector(isRegistrationOpen())

	switch (isOpen) {
		case true: return <RegisterRouter/>
		case false: return <NotOpenYet/>
		case null: return <div>Loading...</div>
	}
}

const RegisterPage = (_: ReadonlyRouteComponentProps) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(CheckCountdown.create(undefined))
	}, [])

	return <Layout>
		<FunnelErrorGuard>
			<Content/>
		</FunnelErrorGuard>
	</Layout>
}

export default RegisterPage
