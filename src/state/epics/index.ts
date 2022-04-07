import { combineEpics } from 'redux-observable'

import autosave from './autosave'
import register from './register'
import hotelBooking from './hotel-booking'

export default combineEpics(
	autosave,
	register,
	hotelBooking,
)
