import { AppState } from '..'
import { AdditionalInfo, GuestsInfo, RoomInfo } from '../models/hotel-booking'

export const getRoomInfo = () => (s: AppState) => s.hotelBooking.roomInfo as RoomInfo | undefined
export const getGuestsInfo = () => (s: AppState) => s.hotelBooking.guestsInfo as GuestsInfo | undefined
export const getAdditionalInfo = () => (s: AppState) => s.hotelBooking.additionalInfo as AdditionalInfo | undefined
