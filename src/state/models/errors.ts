import type { ErrorMessage as AttSrvErrorMessage, ErrorDto as AttSrvErrorDto } from '~/apis/attsrv'
import type { Replace } from 'type-fest'

export type FrontendErrorCode =
	| 'network-error'
	| 'unknown'

export type AppErrorOperation =
	| 'registration-open-check'
	| 'registration-submission'
	| 'registration-update'
	| 'unknown'

export type AppErrorCode = {
	attsrv: Replace<AttSrvErrorMessage, '.', '-', { all: true }>
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

export class FrontendAppError extends AppError<'frontend'> {
	constructor(operation: AppErrorOperation, code: FrontendErrorCode, detailedMessage: string) {
		super(operation, 'frontend', code, detailedMessage)
	}
}
