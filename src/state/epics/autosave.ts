import { combineEpics } from 'redux-observable'
import { pick, equals } from 'ramda'
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators'
import { AnyAppAction, GetAction } from '~/state/actions'
import { UpdateLastSavedTime } from '~/state/actions/autosave'
import { AppState } from '~/state'

const TIME_BEFORE_SAVING = 2000

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	(action$, state$) => state$.pipe(
		map(pick(['forms', 'register', 'hotelBooking'])),
		distinctUntilChanged(equals),
		debounceTime(TIME_BEFORE_SAVING),
		tap(autosaveData => localStorage.setItem('autosave', JSON.stringify(autosaveData))),
		map(() => UpdateLastSavedTime.create(new Date())),
	),
)
