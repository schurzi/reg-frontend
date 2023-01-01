import { RegisterRouter } from '~/navigation/router'
import Layout from '~/components/layout'
import SEO from '~/components/seo'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import { useObservable, useObservableState } from 'observable-hooks'
import { registrationCountdownCheck } from '~/apis/attsrv'
import { EMPTY } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { AjaxError } from 'rxjs/ajax'
import { StatusCodes } from 'http-status-codes'
import { InitiateLogin } from '~/state/actions/auth'
import { useAppDispatch } from '~/hooks/redux'
import NotOpenYet from '~/components/funnels/funnels/register/not-open-yet'

export const Head = () => <SEO title="Register" />

const Content = ({ isRegistrationOpen }: { readonly isRegistrationOpen: boolean | null }) => {
	switch (isRegistrationOpen) {
		case true: return <RegisterRouter/>
		case false: return <NotOpenYet/>
		case null: return <div>Loading...</div>
	}
}

const RegisterPage = (_: ReadonlyRouteComponentProps) => {
	const dispatch = useAppDispatch()
	const countdownQuery$ = useObservable(() => registrationCountdownCheck().pipe(
		map(result => result.response.countdown <= 0),
		catchError(err => {
			if (err instanceof AjaxError) {
				if (err.status === StatusCodes.UNAUTHORIZED) {
					dispatch(InitiateLogin.create(undefined))
				}
			}

			return EMPTY
		}),
	))
	const isRegistrationOpen = useObservableState(countdownQuery$, null)

	return <Layout>
		<Content isRegistrationOpen={isRegistrationOpen}/>
	</Layout>
}

export default RegisterPage
