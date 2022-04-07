import { RegisterState } from '~/state/reducers/register'
import { HotelBookingState } from '~/state/reducers/hotel-booking'

export interface AutosaveData {
	register: RegisterState
	hotelBooking: HotelBookingState
}

