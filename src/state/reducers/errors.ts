import { AnyAppAction, GetAction } from '~/state/actions'
import { ClearError, ReportError } from '~/state/actions/errors'

export interface ErrorsState {
	readonly currentError?: Readonly<Error>
}

export default (state: ErrorsState = {}, action: GetAction<AnyAppAction>): ErrorsState => {
	switch (action.type) {
		case ReportError.type:
			return { ...state, currentError: action.payload }
		case ClearError.type:
			return { ...state, currentError: undefined }
		default:
			return state
	}
}
