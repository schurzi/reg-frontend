import { combineEpics, ofType } from 'redux-observable'
import { ignoreElements, tap } from 'rxjs/operators'
import config from '~/config'
import { AppState } from '~/state'
import { AnyAppAction, GetAction } from '~/state/actions'
import { InitiateLogin } from '~/state/actions/auth'

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	action$ => action$.pipe(
		ofType(InitiateLogin.type),
		tap(() => {
			location.href = `${config.apis.authsrv.url}/auth?app_name=${config.apis.authsrv.appName}`//&dropoff_url=${location.href}`
		}),
		ignoreElements(),
	),
)
