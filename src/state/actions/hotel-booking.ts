import type { DeepPartial } from 'ts-essentials'
import { RoomInfo, GuestsInfo, AdditionalInfo } from '~/state/models/hotel-booking'
import { createAction } from './create-action'

export const ChangeRoomInfo = createAction<DeepPartial<RoomInfo>, '[Hotel Booking] Change room info'>('[Hotel Booking] Change room info')
export const ChangeGuestsInfo = createAction<DeepPartial<GuestsInfo>, '[Hotel Booking] Change guests info'>('[Hotel Booking] Change guests info')
export const ChangeAdditionalInfo = createAction<DeepPartial<AdditionalInfo>, '[Hotel Booking] Change additional info'>('[Hotel Booking] Change additional info')
export const SubmitRoomInfo = createAction<RoomInfo, '[Hotel Booking] Submit room info'>('[Hotel Booking] Submit room info')
export const SubmitGuestsInfo = createAction<GuestsInfo, '[Hotel Booking] Submit guests info'>('[Hotel Booking] Submit guests info')
export const SubmitAdditionalInfo = createAction<AdditionalInfo, '[Hotel Booking] Submit additional info'>('[Hotel Booking] Submit additional info')

export type HotelBookingAction
	= typeof ChangeRoomInfo
	| typeof ChangeGuestsInfo
	| typeof ChangeAdditionalInfo
	| typeof SubmitRoomInfo
	| typeof SubmitGuestsInfo
	| typeof SubmitAdditionalInfo
