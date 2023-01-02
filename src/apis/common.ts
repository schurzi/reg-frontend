/* eslint-disable camelcase */

export interface ErrorDto<ErrorMessage extends string> {
	// The time at which the error occurred.
	readonly timestamp: string // 2006-01-02T15:04:05+07:00

	// An internal trace id assigned to the error. Used to find logs associated with errors across our services. Display to the user as something to communicate to us with inquiries about the error.
	readonly requestid: string // a8b7c6d5

	// A keyed description of the error. We do not write human-readable text here because the user interface will be multi-language.
	readonly message: ErrorMessage // attendee.owned.notfound or similar

	// Optional additional details about the error. If available, will usually contain English language technobabble.
	readonly details: Readonly<Record<string, readonly string[]>>
}
