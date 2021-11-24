import { ActionsObservable, combineEpics, ofType } from 'redux-observable'
import { navigate } from '@reach/router'
import { SubmitContactInfo, SubmitPersonalInfo, SubmitTicketDay, SubmitTicketLevel, SubmitTicketType } from '../actions/register'
import { ignoreElements, tap } from 'rxjs/operators'
import { AppAction } from '../actions'
import { always } from 'ramda'
import { GetAction } from '../actions/create-action'

const nextPage = <T extends AppAction>(action: T, pathProvider: (action: GetAction<T>) => string) =>
	(action$: ActionsObservable<GetAction<AppAction>>) => action$.pipe(
		ofType<GetAction<AppAction>, GetAction<T>>(action.type),
		tap(action => navigate(pathProvider(action))),
		ignoreElements(),
	)

export default combineEpics<GetAction<AppAction>>(
	nextPage(SubmitTicketType, ({ payload }) => `/register/ticket/${payload === 'full' ? 'level' : 'day'}`),
	nextPage(SubmitTicketDay, always('/register/ticket/level')),
	nextPage(SubmitTicketLevel, always('/register/personal-info')),
	nextPage(SubmitPersonalInfo, always('/register/contact-info')),
	nextPage(SubmitContactInfo, always('/register/optional-info')),
)
