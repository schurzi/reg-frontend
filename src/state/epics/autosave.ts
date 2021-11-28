import { combineEpics } from 'redux-observable'
import { pick, equals } from 'ramda'
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators'
import { DateTime } from 'luxon'
import { AnyAppAction, GetAction } from '~/state/actions'
import { UpdateLastSavedTime, LoadAutosaveData } from '~/state/actions/autosave'
import { AppState } from '~/state'
import { fromEvent } from 'rxjs'

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	() => fromEvent(document, 'DOMContentLoaded').pipe(
		map(() => {
			const serializedData = localStorage.getItem('autosave')

			return serializedData === null ? null : JSON.parse(serializedData)
		}),
		filter(data => data !== null),
		map(data => LoadAutosaveData.create(data)),
	),
	(action$, state$) => state$.pipe(
		map(pick(['register'])),
		distinctUntilChanged(equals),
		debounceTime(2000),
		tap(data => localStorage.setItem('autosave', JSON.stringify(data))),
		map(() => UpdateLastSavedTime.create(DateTime.now())),
	)
)
