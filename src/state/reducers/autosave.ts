import { AnyAppAction, GetAction } from '~/state/actions'
import { UpdateLastSavedTime } from '~/state/actions/autosave'
import { DateTime } from 'luxon'

export interface AutosaveState {
	readonly lastSaved?: DateTime
}

export default (state: AutosaveState = {}, action: GetAction<AnyAppAction>): AutosaveState => {
	switch (action.type) {
		case UpdateLastSavedTime.type:
			return { ...state, lastSaved: action.payload }
		default:
			return state
	}
}
