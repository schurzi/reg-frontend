import { combineEpics } from 'redux-observable'
import { SubmitRoomInfo, SubmitGuestsInfo, SubmitAdditionalInfo } from '~/state/actions/hotel-booking'
import { AnyAppAction, GetAction } from '~/state/actions'
import { always } from 'ramda'
import { AppState } from '~/state'
import { nextPage } from './generators/next-page'

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	nextPage(SubmitRoomInfo, always('/hotel-booking/guests')),
	nextPage(SubmitGuestsInfo, always('/hotel-booking/additional-info')),
	nextPage(SubmitAdditionalInfo, always('/hotel-booking/email')),
)
