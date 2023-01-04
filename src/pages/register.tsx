import { RegisterRouter } from '~/navigation/router'
import Layout from '~/components/layout'
import SEO from '~/components/seo'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import { useObservable, useObservableState } from 'observable-hooks'
import { registrationCountdownCheck } from '~/apis/attsrv'
import { catchError, map } from 'rxjs/operators'
import NotOpenYet from '~/components/funnels/funnels/register/not-open-yet'
import FunnelErrorGuard from '~/components/funnels/error-guard'
import { handleAttSrvApiError } from '~/state/epics/error-handlers/apis'
import { useObservableDispatch } from '~/hooks/observable-dispatch'

export const Head = () => <SEO title="Register" />

const Content = ({ isRegistrationOpen }: { readonly isRegistrationOpen: boolean | null }) => {
	switch (isRegistrationOpen) {
		case true: return <RegisterRouter/>
		case false: return <NotOpenYet/>
		case null: return <div>Loading...</div>
	}
}

const RegisterPage = (_: ReadonlyRouteComponentProps) => {
	const $dispatch = useObservableDispatch()
	const countdownQuery$ = useObservable(() => registrationCountdownCheck().pipe(
		map(result => result.response.countdown <= 0),
		catchError(err => $dispatch(handleAttSrvApiError('registration-open-check')(err))),
	))
	const isRegistrationOpen = useObservableState(countdownQuery$, null)

	return <Layout>
		<FunnelErrorGuard>
			<Content isRegistrationOpen={isRegistrationOpen}/>
		</FunnelErrorGuard>
	</Layout>
}

export default RegisterPage
