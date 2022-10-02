import { combineEpics } from 'redux-observable'
import { SubmitContactInfo, SubmitOptionalInfo, SubmitPersonalInfo, SubmitTicketDay, SubmitTicketLevel, SubmitTicketType } from '~/state/actions/register'
import { AnyAppAction, GetAction } from '~/state/actions'
import { always } from 'ramda'
import { AppState } from '~/state'
import { nextPage } from './generators/next-page'

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	nextPage(SubmitTicketType, ({ payload }) => `/register/ticket/${payload.type === 'full' ? 'level' : 'day'}`),
	nextPage(SubmitTicketDay, always('/register/ticket/level')),
	nextPage(SubmitTicketLevel, always('/register/personal-info')),
	nextPage(SubmitPersonalInfo, always('/register/contact-info')),
	nextPage(SubmitContactInfo, always('/register/optional-info')),
	nextPage(SubmitOptionalInfo, always('/register/summary')),
)
