import type { DeepPartial } from 'ts-essentials'
import { RoomInfo } from '~/state/models/hotel-booking'
import { createAction } from './create-action'

export const ChangeRoomInfo = createAction<DeepPartial<RoomInfo>, '[Hotel Booking] Change room info'>('[Hotel Booking] Change room info')
export const SubmitRoomInfo = createAction<RoomInfo, '[Hotel Booking] Submit room info'>('[Hotel Booking] Submit room info')

export type HotelBookingAction
	= typeof ChangeRoomInfo
	| typeof SubmitRoomInfo
