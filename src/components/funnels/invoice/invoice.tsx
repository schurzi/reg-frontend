import styled from '@emotion/styled'
import { Card } from '@eurofurence/reg-component-library'
import InvoiceItemComponent from './item'
import Footer from './footer'
import { sum } from 'ramda'

const InvoiceCard = styled(Card)`
	grid-column: 10 / span 3;
	align-self: start;
`

export interface InvoiceItem {
	name: string
	amount: number
	unitPrice: number
	extra?: string
}

export interface InvoiceProps {
	title: string
	items: InvoiceItem[]
}

const Invoice = ({ title, items }: InvoiceProps) =>
	<InvoiceCard inverted={true}>
		<header>
			<h1>{title}</h1>
		</header>
		<div>
			<ul>
				{items.map(({ amount, unitPrice, name, extra }, i) =>
					<InvoiceItemComponent key={i} label={`${amount} x ${name}`} price={amount * unitPrice} extra={extra}/>
				)}
			</ul>
		</div>
		<Footer totalPrice={sum(items.map(({ amount, unitPrice }) => amount * unitPrice))}/>
	</InvoiceCard>

export default Invoice
