import { FormsState } from '~/state/reducers/forms'
import { RegisterState } from '~/state/reducers/register'
import { HotelBookingState } from '~/state/reducers/hotel-booking'

export interface AutosaveData {
	readonly forms: FormsState
	readonly register: RegisterState
	readonly hotelBooking: HotelBookingState
}

