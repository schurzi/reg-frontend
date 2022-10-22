import { combineReducers } from 'redux'

import autosave from './autosave'
import forms from './forms'
import register from './register'
import hotelBooking from './hotel-booking'

export default combineReducers<{
	readonly autosave: typeof autosave
	readonly forms: typeof forms
	readonly register: typeof register
	readonly hotelBooking: typeof hotelBooking
}>({
	autosave,
	forms,
	register,
	hotelBooking,
})
