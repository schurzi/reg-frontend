import { ActionsObservable, combineEpics, ofType } from 'redux-observable'
import { navigate } from '@reach/router'
import { SubmitContactInfo, SubmitPersonalInfo, SubmitTicketDay, SubmitTicketLevel, SubmitTicketType } from '../actions/register'
import { ignoreElements, tap } from 'rxjs/operators'
import { AnyAppAction, GetAction } from '../actions'
import { always } from 'ramda'
import { AppState } from '..'

const nextPage = <T extends AnyAppAction>(action: T, pathProvider: (action: GetAction<T>) => string) =>
	(action$: ActionsObservable<GetAction<AnyAppAction>>) => action$.pipe(
		ofType<GetAction<AnyAppAction>, GetAction<T>>(action.type),
		tap(action => navigate(pathProvider(action))),
		ignoreElements(),
	)

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	nextPage(SubmitTicketType, ({ payload }) => `/register/ticket/${payload === 'full' ? 'level' : 'day'}`),
	nextPage(SubmitTicketDay, always('/register/ticket/level')),
	nextPage(SubmitTicketLevel, always('/register/personal-info')),
	nextPage(SubmitPersonalInfo, always('/register/contact-info')),
	nextPage(SubmitContactInfo, always('/register/optional-info')),
)
