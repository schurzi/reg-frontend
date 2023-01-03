import { combineReducers } from 'redux'

import autosave from './autosave'
import errors from './errors'
import forms from './forms'
import register from './register'
import hotelBooking from './hotel-booking'

export default combineReducers<{
	readonly autosave: typeof autosave
	readonly errors: typeof errors
	readonly forms: typeof forms
	readonly register: typeof register
	readonly hotelBooking: typeof hotelBooking
}>({
	autosave,
	errors,
	forms,
	register,
	hotelBooking,
})
