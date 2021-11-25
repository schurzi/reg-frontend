import { combineEpics } from 'redux-observable'
import { pick, equals } from 'ramda'
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators'
import { DateTime } from 'luxon'
import { AnyAppAction, GetAction } from '../actions'
import { UpdateLastSavedTime } from '../actions/autosave'
import { AppState } from '..'

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	(action$, state$) => state$.pipe(
		distinctUntilChanged(equals, pick(['register'])),
		debounceTime(2000),
		tap(({ register }) => localStorage.setItem('register', JSON.stringify(register))),
		map(() => UpdateLastSavedTime.create(DateTime.now())),
	)
)
