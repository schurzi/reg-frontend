import { combineReducers } from 'redux'

import autosave from './autosave'
import register from './register'

export default combineReducers({
	autosave,
	register,
})
