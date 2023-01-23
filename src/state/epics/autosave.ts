import { combineEpics } from 'redux-observable'
import { equals } from 'ramda'
import { distinctUntilChanged, map, tap } from 'rxjs/operators'
import { AnyAppAction, GetAction } from '~/state/actions'
import { UpdateLastSavedTime } from '~/state/actions/autosave'
import { AppState } from '~/state'
import { getSaveData } from '../selectors/autosave'
import { save } from '~/util/local-storage'

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	(action$, state$) => state$.pipe(
		map(getSaveData()),
		distinctUntilChanged(equals),
		tap(autosaveData => save('redux-state', autosaveData)),
		map(() => UpdateLastSavedTime.create(new Date())),
	),
)
