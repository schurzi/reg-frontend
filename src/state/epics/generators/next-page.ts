import { ofType } from 'redux-observable'
import { navigate } from '@reach/router'
import { ignoreElements, tap } from 'rxjs/operators'
import { AnyAppAction, GetAction } from '~/state/actions'
import { Observable } from 'rxjs'

export const nextPage = <T extends AnyAppAction>(action: T, pathProvider: (action: GetAction<T>) => string) =>
	(action$: Observable<GetAction<AnyAppAction>>) => action$.pipe(
		ofType<GetAction<AnyAppAction>, T['type'], GetAction<T>>(action.type),
		tap(action => navigate(pathProvider(action))),
		ignoreElements(),
	)
