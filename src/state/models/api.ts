/* eslint-disable camelcase */

// --- all services ---

export interface ErrorDto {
	// The time at which the error occurred.
	readonly timestamp: string // 2006-01-02T15:04:05+07:00

	// An internal trace id assigned to the error. Used to find logs associated with errors across our services. Display to the user as something to communicate to us with inquiries about the error.
	readonly requestid: string // a8b7c6d5

	// A keyed description of the error. We do not write human-readable text here because the user interface will be multi-language.
	readonly message: string // attendee.owned.notfound or similar

	// Optional additional details about the error. If available, will usually contain English language technobabble.
	readonly details: object // map[string][]string
}

// --- attendee service ---

export interface AttendeeDto {
	readonly id: bigint | null
	readonly nickname: string
	readonly first_name: string
	readonly last_name: string
	readonly street: string
	readonly zip: string
	readonly city: string
	readonly country: string // DE
	readonly country_badge: string // will change soon
	readonly state: string | null
	readonly email: string
	readonly phone: string
	readonly telegram: string | null // @Username
	readonly partner: string | null
	readonly birthday: string // 1972-11-06
	readonly gender: string | null // always set to 'notprovided'
	readonly pronouns: string | null
	readonly tshirt_size: string | null
	readonly flags: string // anon,ev
	readonly options: string // art,anim,music,suit
	readonly packages: string // room-none,attendance,sponsor
	readonly user_comments: string | null
}

export interface AttendeeIdListDto {
	readonly ids: readonly bigint[]
}

export interface CountdownDto {
	readonly countdown: bigint
}

// --- payment service ---

export enum TransactionType {
	due = 'due', // part of an invoice
	payment = 'payment', // an actual payment transaction
}

export enum Method {
	credit = 'credit', // a credit card payment
	paypal = 'paypal', // a paypal payment
	transfer = 'transfer', // a money transfer
	internal = 'internal', // internal booking (also used for dues)
	gift = 'gift', // transfer of funds between two attendees if one gifts their reg to another
}

export enum Status {
	tentative = 'tentative', // a payment link has been prepared but no payment reported yet
	pending = 'pending', // the card processor has reported payment
	valid = 'valid', // the money is in our account or the dues are valid
	deleted = 'deleted', // ignore these (normal users shouldn't even see them)
}

export interface Amount {
	readonly currency: string // EUR
	readonly gross_cent: bigint // positive or negative amount in whole cents (the smallest currency donation to be precise)
	readonly vat_rate: number // VAT rate in percent, in Germany usually 7.0 or 19.0
}

export interface TransactionDto {
	// same as attendee id (we use the badge number as debitor id)
	readonly debitor_id: bigint

	// a reference id that can be used to search for a particular transaction
	readonly transaction_identifier: string // EF2022-000004-1230-184425-1234

	readonly transaction_type: TransactionType

	readonly method: Method

	readonly amount: Amount

	readonly comment: string

	readonly status: Status

	// this is where you find the paylink!
	readonly payment_start_url: string

	readonly effective_date: string // 2022-12-30

	readonly due_date: string // 2022-12-28

	// when this record was created
	readonly creation_date: string // 2022-06-24T11:12:13Z
}

export interface TransactionResponseDto {
	readonly payload: readonly TransactionDto[]
}
