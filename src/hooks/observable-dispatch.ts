import { Observable } from 'rxjs'
import { ignoreElements, tap } from 'rxjs/operators'
import { AnyAppAction, GetAction } from '~/state/actions'
import { useAppDispatch } from './redux'

export const useObservableDispatch = () => {
	const dispatch = useAppDispatch()

	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	return (action$: Observable<GetAction<AnyAppAction>>) => action$.pipe(
		tap(dispatch),
		ignoreElements(),
	)
}
