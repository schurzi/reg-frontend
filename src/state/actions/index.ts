import { AutosaveAction } from './autosave'
import { HotelBookingAction } from './hotel-booking'
import { RegisterAction } from './register'

export type { GetAction } from './create-action'

export type AnyAppAction
	= AutosaveAction
	| HotelBookingAction
	| RegisterAction
