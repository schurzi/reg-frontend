import { combineEpics } from 'redux-observable'
import { AnyAppAction, GetAction } from '~/state/actions'
import { always } from 'ramda'
import { AppState } from '~/state'
import { nextPage } from './generators/next-page'
import { SubmitForm } from '../actions/forms'

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	nextPage(SubmitForm('register-ticket-type'), ({ payload }) => `/register/ticket/${payload.type === 'full' ? 'level' : 'day'}`),
	nextPage(SubmitForm('register-ticket-day'), always('/register/ticket/level')),
	nextPage(SubmitForm('register-ticket-level'), always('/register/personal-info')),
	nextPage(SubmitForm('register-personal-info'), always('/register/contact-info')),
	nextPage(SubmitForm('register-contact-info'), always('/register/optional-info')),
	nextPage(SubmitForm('register-optional-info'), always('/register/summary')),
)
