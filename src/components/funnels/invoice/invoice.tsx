/*
 * Implements the blue invoice on the right side of most funnel pages.
 * Automatically calculates total price figure.
 */

import styled from '@emotion/styled'
import { Button, Card } from '@eurofurence/reg-component-library'
import InvoiceItem from './item'
import InvoiceTotalItem from './total-item'
import { Localized } from '@fluent/react'
import { Invoice as InvoiceModel } from '~/state/models/invoice'

const InvoiceCard = styled(Card)`
	grid-column: 10 / span 3;
	align-self: start;
`

const PayButton = styled(Button)`
	margin-top: 1.5em;
	width: 100%;
`

export interface InvoiceProps {
	readonly title: string
	readonly invoice: InvoiceModel
	readonly onPay?: () => void
}

const Invoice = ({ title, invoice, onPay }: InvoiceProps) =>
	<InvoiceCard inverted={true}>
		<header>
			<h1>{title}</h1>
		</header>
		<section>
			<ul>
				{invoice.items.map(({ id, options, amount, totalPrice }) =>
					<Localized key={id} id={`invoice-item-definition-${id}`} attrs={{ name: true, extra: true }} vars={options}>
						<InvoiceItem amount={amount} name={id} price={totalPrice}/>
					</Localized>,
				)}
			</ul>
		</section>
		<section>
			<ul>
				<Localized id="invoice-total" attrs={{ name: true, extra: true }}>
					<InvoiceTotalItem type="price" name="Total" value={invoice.totalPrice}/>
				</Localized>
				{invoice.paid === undefined ? undefined : <Localized id="invoice-paid" attrs={{ name: true, extra: true }}>
					<InvoiceTotalItem type="due" name="Paid" value={-invoice.paid}/>
				</Localized>}
				{invoice.due === undefined || invoice.due === 0 ? undefined : <Localized id="invoice-due" attrs={{ name: true, extra: true }}>
					<InvoiceTotalItem type="due" name="Due" warn={true} value={invoice.due}/>
				</Localized>}
			</ul>
			{invoice.due === undefined || invoice.due === 0 ? undefined : <Localized id="invoice-pay-button-credit-card">
				<PayButton inverted={true} onClick={onPay}>Pay with CC</PayButton>
			</Localized>}
		</section>
	</InvoiceCard>

export default Invoice
