import { combineReducers } from 'redux'

import autosave from './autosave'
import register from './register'
import hotelBooking from './hotel-booking'

export default combineReducers({
	autosave,
	register,
	hotelBooking,
})
