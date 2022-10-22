import { RoomInfo, GuestsInfo, AdditionalInfo } from '~/state/models/hotel-booking'
import { AnyAppAction, GetAction } from '~/state/actions'
import type { DeepNonNullable } from 'ts-essentials'
import { SubmitForm } from '../actions/forms'
import autosaveData from '~/state/autosave'

export interface HotelBookingState {
	readonly roomInfo?: RoomInfo
	readonly guestsInfo?: GuestsInfo
	readonly additionalInfo?: AdditionalInfo
}

export default (state: HotelBookingState = autosaveData?.hotelBooking ?? {}, action: GetAction<AnyAppAction>): HotelBookingState => {
	switch (action.type) {
		case SubmitForm('hotel-booking-room').type:
			return { ...state, roomInfo: action.payload as DeepNonNullable<typeof action.payload> }
		case SubmitForm('hotel-booking-guests').type:
			return { ...state, guestsInfo: action.payload as DeepNonNullable<typeof action.payload> }
		case SubmitForm('hotel-booking-additional-info').type:
			return { ...state, additionalInfo: action.payload as DeepNonNullable<typeof action.payload> }
		default:
			return state
	}
}
