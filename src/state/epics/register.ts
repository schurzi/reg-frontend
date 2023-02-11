import { concatMap, withLatestFrom, map } from 'rxjs/operators'
import { combineEpics, Epic, ofType } from 'redux-observable'
import { AnyAppAction, GetAction } from '~/state/actions'
import { always } from 'ramda'
import { AppState } from '~/state'
import { nextPage } from './generators/next-page'
import { SubmitForm } from '~/state/actions/forms'
import { CheckCountdown, InitiatePayment, LoadRegistrationState } from '~/state/actions/register'
import { findExistingRegistration, registrationCountdownCheck, submitRegistration, updateRegistration } from '~/apis/attsrv'
import { navigate } from 'gatsby'
import { getRegistrationId, getRegistrationInfo, isEditMode } from '~/state/selectors/register'
import { RegistrationInfo } from '~/state/models/register'
import { justDo } from '~/state/epics/operators/just-do'
import { EMPTY, of } from 'rxjs'
import { addHours, isBefore } from 'date-fns'
import config from '~/config'
import { calculateOutstandingDues, calculateTotalPaid, findTransactionsForBadgeNumber, hasUnprocessedPayments, initiateCreditCardPaymentOrUseExisting } from '~/apis/paysrv'
import { catchAppError } from './operators/catch-app-error'

const nextPageOrSave = <T extends AnyAppAction>(actionBundle: T, pathProvider: (action: GetAction<T>) => string): Epic<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState> =>
	(action$, state$) => action$.pipe(
		ofType<GetAction<AnyAppAction>, T['type'], GetAction<T>>(actionBundle.type),
		withLatestFrom(state$),
		concatMap(([action, state]) => {
			if (isEditMode()(state)) {
				return updateRegistration(getRegistrationInfo()(state) as RegistrationInfo).pipe(
					justDo(() => navigate('/register/summary')),
					catchAppError('registration-update'),
				)
			} else {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				navigate(pathProvider(action))

				return EMPTY
			}
		}),
	)

export default combineEpics<GetAction<AnyAppAction>, GetAction<AnyAppAction>, AppState>(
	// Navigation in the funnel
	nextPage(SubmitForm('register-ticket-type'), ({ payload }) => `/register/ticket/${payload.type === 'full' ? 'level' : 'day'}`),
	nextPageOrSave(SubmitForm('register-ticket-day'), always('/register/ticket/level')),
	nextPageOrSave(SubmitForm('register-ticket-level'), always('/register/personal-info')),
	nextPageOrSave(SubmitForm('register-personal-info'), always('/register/contact-info')),
	nextPageOrSave(SubmitForm('register-contact-info'), always('/register/optional-info')),
	nextPageOrSave(SubmitForm('register-optional-info'), always('/register/summary')),

	// Submit registration
	(action$, state$) => action$.pipe(
		ofType(SubmitForm('register-summary').type),
		withLatestFrom(state$),
		concatMap(([, state]) => submitRegistration(getRegistrationInfo()(state) as RegistrationInfo).pipe(
			justDo(() => navigate('/register/thank-you')),
		)),
		catchAppError('registration-submission'),
	),

	// Check if registrations are open and if and existing registration exists
	action$ => action$.pipe(
		ofType(CheckCountdown.type),
		concatMap(() => registrationCountdownCheck().pipe(
			concatMap(result => {
				if (result.response.countdown > 0) {
					return of(LoadRegistrationState.create({ isOpen: false }))
				} else if (isBefore(new Date(result.response.currentTime), addHours(new Date(result.response.targetTime), config.hoursBeforeEditAvailable))) {
					return of(LoadRegistrationState.create({ isOpen: true }))
				} else {
					return findExistingRegistration().pipe(
						concatMap(registrationInfo => registrationInfo === undefined
							? of(LoadRegistrationState.create({ isOpen: true }))
							: findTransactionsForBadgeNumber(registrationInfo.id!).pipe(
								map(transactions => LoadRegistrationState.create({
									isOpen: true,
									registrationInfo,
									paid: calculateTotalPaid(transactions) / 100,
									due: calculateOutstandingDues(transactions) / 100, // TODO: Use big.js
									unprocessedPayments: hasUnprocessedPayments(transactions),
								})),
							),
						),
					)
				}
			}),
		)),
		catchAppError('registration-open-check'),
	),

	(action$, state$) => action$.pipe(
		ofType(InitiatePayment.type),
		withLatestFrom(state$),
		concatMap(([, state]) => initiateCreditCardPaymentOrUseExisting(getRegistrationId()(state)!).pipe(
			justDo(transaction => {
				location.href = transaction.payment_start_url
			}),
		)),
		catchAppError('registration-initiate-payment'),
	),
)
