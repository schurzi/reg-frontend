import { AppState } from '..'

import { getSaveData as getRegisterSaveData } from './register'
import { getSaveData as getHotelBookingSaveData } from './hotel-booking'

export const getLastSaved = () => (s: AppState) => s.autosave.lastSaved
export const getSaveData = () => (s: AppState) => ({
	register: getRegisterSaveData()(s),
	hotelBooking: getHotelBookingSaveData()(s),
})
