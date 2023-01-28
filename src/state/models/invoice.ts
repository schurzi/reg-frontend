import { sum, pluck } from 'ramda'
import { ReadonlyDate } from '~/util/readonly-types'

export interface UncalculatedInvoiceItem {
	readonly id: string
	readonly options?: Readonly<Record<string, string | number | ReadonlyDate>>
	readonly amount: number
	readonly unitPrice: number
}

export interface InvoiceItem extends UncalculatedInvoiceItem {
	readonly totalPrice: number
}

export interface Invoice {
	readonly items: readonly InvoiceItem[]
	readonly totalPrice: number
	readonly paid?: number
	readonly due?: number
}

const augmentInvoiceItem = (item: UncalculatedInvoiceItem) => {
	return { ...item, totalPrice: item.amount * item.unitPrice }
}

export const buildInvoice = (items: readonly UncalculatedInvoiceItem[], { paid, due }: Pick<Invoice, 'paid' | 'due'> = {}) => {
	const augmentedItems = items.map(augmentInvoiceItem)

	return {
		items: augmentedItems,
		totalPrice: sum(pluck('totalPrice', augmentedItems)),
		paid,
		due,
	}
}
