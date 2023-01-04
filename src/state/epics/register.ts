import { tap, concatMap, withLatestFrom, ignoreElements, catchError } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { AnyAppAction, GetAction } from '~/state/actions'
import { always } from 'ramda'
import { AppState } from '~/state'
import { nextPage } from './generators/next-page'
import { SubmitForm } from '~/state/actions/forms'
import { SubmitRegistration } from '~/state/actions/register'
import { submitRegistration } from '~/apis/attsrv'
import { navigate } from 'gatsby'
import { getRegistrationInfo } from '~/state/selectors/register'
import { RegistrationInfo } from '~/state/models/register'
import { handleAttSrvApiError } from './error-handlers/apis'

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	// Navigation in the funnel
	nextPage(SubmitForm('register-ticket-type'), ({ payload }) => `/register/ticket/${payload.type === 'full' ? 'level' : 'day'}`),
	nextPage(SubmitForm('register-ticket-day'), always('/register/ticket/level')),
	nextPage(SubmitForm('register-ticket-level'), always('/register/personal-info')),
	nextPage(SubmitForm('register-personal-info'), always('/register/contact-info')),
	nextPage(SubmitForm('register-contact-info'), always('/register/optional-info')),
	nextPage(SubmitForm('register-optional-info'), always('/register/summary')),

	// Submit registration
	(action$, state$) => action$.pipe(
		ofType(SubmitRegistration.type),
		withLatestFrom(state$),
		concatMap(([, state]) => submitRegistration(getRegistrationInfo()(state) as RegistrationInfo).pipe(
			tap(() => navigate('/register/thank-you')),
			ignoreElements(),
			catchError(handleAttSrvApiError('registration-submission')),
		)),
	),
)
