import { DeepReadonly } from 'utility-types'
import { sum, pluck } from 'ramda'

export interface UncalculatedInvoiceItem {
	readonly id: string
	readonly options?: DeepReadonly<Record<string, string | number | Date>>
	readonly amount: number
	readonly unitPrice: number
}

export interface InvoiceItem extends UncalculatedInvoiceItem {
	readonly totalPrice: number
}

export interface Invoice {
	readonly items: readonly InvoiceItem[]
	readonly totalPrice: number
}

const augmentInvoiceItem = (item: UncalculatedInvoiceItem) => {
	return { ...item, totalPrice: item.amount * item.unitPrice }
}

export const buildInvoice = (items: readonly UncalculatedInvoiceItem[]) => {
	const augmentedItems = items.map(augmentInvoiceItem)

	return {
		items: augmentedItems,
		totalPrice: sum(pluck('totalPrice', augmentedItems)),
	}
}
