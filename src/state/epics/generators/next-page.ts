import { Epic, ofType } from 'redux-observable'
import { navigate } from 'gatsby'
import { AnyAppAction, GetAction } from '~/state/actions'
import { AppState } from '~/state'
import { justDo } from '~/state/epics/operators/just-do'

export const nextPage = <T extends AnyAppAction>(actionBundle: T, pathProvider: (action: GetAction<T>) => string): Epic<GetAction<AnyAppAction>, never, AppState> =>
	action$ => action$.pipe(
		ofType<GetAction<AnyAppAction>, T['type'], GetAction<T>>(actionBundle.type),
		justDo(action => navigate(pathProvider(action))),
	)
