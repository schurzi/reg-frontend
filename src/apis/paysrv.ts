import { ajax } from 'rxjs/ajax'
import config from '~/config'
/* eslint-disable camelcase */
import { ErrorDto, Status, TransactionDto, TransactionResponseDto, TransactionType } from '~/state/models/api'

/*
 * use this after a successful call to findTransactionsForBadgeNumber to calculate the outstanding dues
 *
 * The payment service handles all currency amounts as integers in the currency's smallest denomination, for EUR this is cents.
 */
export const calculateOutstandingDues = (transactions: TransactionResponseDto): bigint => {
	let duesCents: bigint = BigInt(0)
	let paymentsCents: bigint = BigInt(0)

	transactions.payload.forEach((transaction) => {
		if (transaction.status === Status.valid) {
			if (transaction.transaction_type === TransactionType.due) {
				duesCents += transaction.amount.gross_cent
			} else {
				paymentsCents += transaction.amount.gross_cent
			}
		}
	})

	return duesCents - paymentsCents
}

/*
 * use this after a successful call to findTransactionsForBadgeNumber to decide whether to display a
 * warning about not paying twice while a payment is being processed.
 *
 * Should also not generate a new paylink while this is the case.
 */
export const hasUnprocessedPayments = (transactions: TransactionResponseDto): boolean => {
	transactions.payload.forEach((transaction) => {
		if (transaction.status === Status.pending && transaction.transaction_type === TransactionType.payment) {
			return true // you have pending payments. Please wait while we manually process your payment. Do not pay twice!
		}
	})

	return false
}

/*
 * GET /transactions obtains all visible payment/dues transaction for the provided badge number.
 *
 * Replies with either a TransactionResponseDto, or ErrorDto.
 *
 * The badge number (called debitor id in the payment service) should come from the list returned by findMyRegistrations.
 * This will avoid 400, 403.
 *
 * 401: the user's token has expired. You should redirect them to the auth start and have them return here once refreshed.
 * 404: there are no visible transactions for this debitor id.
 * 500: It is important to communicate the ErrorDto's requestid field to the user, so they can give it to us, so we can look in the logs.
 */
export const findTransactionsForBadgeNumber = (badgeNumber: bigint) => ajax<TransactionResponseDto | ErrorDto>({
	url: `${config.apis.paysrv.url}/transactions?debitor_id=${badgeNumber}`,
	method: 'GET',
	crossDomain: true,
	withCredentials: true,
})

/*
 * POST /transactions/initiate-payment creates a payment that includes a payment link.
 *
 * Replies with either a TransactionDto, or ErrorDto.
 *
 * The badge number (called debitor id in the payment service) should come from the list returned by findMyRegistrations.
 * This will avoid 403.
 *
 * All other fields of the created payment are set correctly for a potential payment with the default payment provider,
 * usually type:payment, method:credit, status:tentative, a transaction id derived from the current timestamp and the
 * debitor id, etc.
 *
 * 400: assuming you sent a valid debitorId, means the current dues balance for this debitor is 0. They cannot pay anything.
 *      Usually this means, they have paid in a different session and you should reload their information.
 * 401: the user's token has expired. You should redirect them to the auth start and have them return here once refreshed.
 * 404: No dues transactions for this debitor id exist. Maybe they have not been approved yet.
 * 409: This debitor already has an open payment link, please use that one.
 * 500: It is important to communicate the ErrorDto's requestid field to the user, so they can give it to us, so we can look in the logs.
 */
export const initiateCreditCardPayment = (badgeNumber: bigint) => ajax<TransactionDto | ErrorDto>({
	url: `${config.apis.paysrv.url}/transactions/initiate-payment`,
	method: 'POST',
	crossDomain: true,
	withCredentials: true,
	body: {
		debitor_id: badgeNumber,
	},
})
