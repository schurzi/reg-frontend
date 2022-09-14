import { createSelector } from 'reselect'
import { AppState } from '..'
import { AdditionalInfo, GuestsInfo, RoomInfo } from '../models/hotel-booking'
import { buildInvoice } from '../models/invoice'

export const getRoomInfo = () => (s: AppState) => s.hotelBooking.roomInfo as RoomInfo | undefined
export const getGuestsInfo = () => (s: AppState) => s.hotelBooking.guestsInfo as GuestsInfo | undefined
export const getAdditionalInfo = () => (s: AppState) => s.hotelBooking.additionalInfo as AdditionalInfo | undefined

export const getInvoice = createSelector(getRoomInfo(), (roomInfo) => {
	if (roomInfo === undefined) {
		return undefined
	}

	return buildInvoice([{ amount: 5, id: 'hotel-booking-room-type-standard', unitPrice: 140 }])
})
