import { StatusCodes } from 'http-status-codes'
import { ObservableInput, ObservedValueOf, of, OperatorFunction } from 'rxjs'
import { AjaxError, AjaxTimeoutError } from 'rxjs/ajax'
import { catchError } from 'rxjs/operators'
import { ErrorDto as AttSrvErrorDto } from '~/apis/attsrv'
import { AnyAppAction, GetAction } from '~/state/actions'
import { InitiateLogin } from '~/state/actions/auth'
import { ReportError } from '~/state/actions/errors'
import { AppErrorOperation, AttSrvAppError, FrontendAppError } from '~/state/models/errors'

const catchApiError = <
	T,
	O extends ObservableInput<GetAction<AnyAppAction>>
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types,max-statements
>(operation: AppErrorOperation, f: (err: AjaxError) => O): OperatorFunction<T, T | ObservedValueOf<O> | GetAction<typeof ReportError>> => catchError(err => {
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

		return f(err)
	}

	if (err instanceof Error) {
		return of(ReportError.create(new FrontendAppError(operation, 'unknown', err.message)))
	}

	return of(ReportError.create(new FrontendAppError(operation, 'unknown', 'unknown')))
})

export const catchAttSrvApiError = <T>(operation: AppErrorOperation): OperatorFunction<T, T | GetAction<typeof ReportError | typeof InitiateLogin>> => catchApiError(operation, err => {
	const errDto = err.response as AttSrvErrorDto

	switch (err.status) {
		case StatusCodes.UNAUTHORIZED:
			return of(InitiateLogin.create(undefined))
		default:
			return of(ReportError.create(new AttSrvAppError(operation, errDto)))
	}
})

