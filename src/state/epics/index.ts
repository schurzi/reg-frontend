import { combineEpics } from 'redux-observable'

import autosave from './autosave'
import register from './register'

export default combineEpics(
	autosave,
	register,
)
