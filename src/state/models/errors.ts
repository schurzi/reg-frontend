import type { ErrorMessage as AttSrvErrorMessage, ErrorDto as AttSrvErrorDto } from '~/apis/attsrv'
import type { Replace } from 'type-fest'
import { StatusCodes } from 'http-status-codes'

export type FrontendErrorCode =
	| 'network-error'
	| 'unknown'

export type AppErrorOperation =
	| 'registration-open-check'
	| 'registration-submission'
	| 'registration-update'
	| 'registration-initiate-payment'
	| 'unknown'

export type AppErrorCode = {
	attsrv: Replace<AttSrvErrorMessage, '.', '-', { all: true }>
	paysrv: StatusCodes
	frontend: FrontendErrorCode
}

export type AppErrorCategory = keyof AppErrorCode

export class AppError<Category extends AppErrorCategory = AppErrorCategory> extends Error {
	constructor(
		public operation: AppErrorOperation,
		public category: Category,
		public code: AppErrorCode[Category],
		public detailedMessage: string,
	) {
		super(`${operation} - ${code} - ${detailedMessage}`)
	}
}

export class AttSrvAppError extends AppError<'attsrv'> {
	constructor(operation: AppErrorOperation, err: AttSrvErrorDto) {
		super(operation, 'attsrv', err.message.replaceAll('.', '-'), 'API error')
	}
}

export class PaySrvAppError extends AppError<'paysrv'> {
	constructor(operation: AppErrorOperation, errorCode: StatusCodes) {
		super(operation, 'paysrv', errorCode, 'API error')
	}
}

export class FrontendAppError extends AppError<'frontend'> {
	constructor(operation: AppErrorOperation, code: FrontendErrorCode, detailedMessage: string) {
		super(operation, 'frontend', code, detailedMessage)
	}
}
