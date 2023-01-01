import { combineEpics } from 'redux-observable'

import auth from './auth'
import autosave from './autosave'
import register from './register'
import hotelBooking from './hotel-booking'

export default combineEpics(
	auth,
	autosave,
	register,
	hotelBooking,
)
