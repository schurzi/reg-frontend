import { StatusCodes } from 'http-status-codes'
import { Observable, ObservableInput, ObservedValueOf, of } from 'rxjs'
import { AjaxError, AjaxTimeoutError } from 'rxjs/ajax'
import { ErrorDto as AttSrvErrorDto } from '~/apis/attsrv'
import { AnyAppAction, GetAction } from '~/state/actions'
import { InitiateLogin } from '~/state/actions/auth'
import { ReportError } from '~/state/actions/errors'
import { AppErrorOperation, AttSrvAppError, PaySrvAppError, FrontendAppError } from '~/state/models/errors'


function handleApiError<O extends ObservableInput<GetAction<AnyAppAction>>>(
	operation: AppErrorOperation,
	f: (err: AjaxError) => O, // eslint-disable-line @typescript-eslint/prefer-readonly-parameter-types
): (err: unknown) => Observable<ObservedValueOf<O> | GetAction<typeof ReportError>>

// eslint-disable-next-line func-style
function handleApiError<A extends AnyAppAction>(
	operation: AppErrorOperation,
	f: (err: AjaxError) => Observable<GetAction<A>>, // eslint-disable-line @typescript-eslint/prefer-readonly-parameter-types
): (err: unknown) => Observable<GetAction<A> | GetAction<typeof ReportError>> {
	// eslint-disable-next-line max-statements
	return err => {
		if (err instanceof AjaxTimeoutError) {
			return of(ReportError.create(new FrontendAppError(operation, 'network-error', 'The request timed out.')))
		}

		if (err instanceof AjaxError) {
			if (err.message === 'aborted') {
				return of(ReportError.create(new FrontendAppError(operation, 'network-error', 'The request was aborted.')))
			}

			if (err.status === 0) {
				return of(ReportError.create(new FrontendAppError(operation, 'network-error', 'Request did not complete.')))
			}

			if (err.response === null) {
				return of(ReportError.create(new FrontendAppError(operation, 'network-error', 'API result could not be deserialized.')))
			}

			return f(err)
		}

		if (err instanceof Error) {
			return of(ReportError.create(new FrontendAppError(operation, 'unknown', err.message)))
		}

		return of(ReportError.create(new FrontendAppError(operation, 'unknown', 'unknown')))
	}
}

export const handleAttSrvApiError = (operation: AppErrorOperation) => handleApiError(operation, err => {
	const errDto = err.response as AttSrvErrorDto

	switch (err.status) {
		case StatusCodes.UNAUTHORIZED:
			return of(InitiateLogin.create(undefined))
		default:
			return of(ReportError.create(new AttSrvAppError(operation, errDto)))
	}
})

export const handlePaySrvApiError = (operation: AppErrorOperation) => handleApiError(operation, err => {
	switch (err.status) {
		case StatusCodes.UNAUTHORIZED:
			return of(InitiateLogin.create(undefined))
		default:
			return of(ReportError.create(new PaySrvAppError(operation, err.status)))
	}
})
