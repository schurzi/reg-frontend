/*
 * Implements the blue invoice on the right side of most funnel pages.
 * Automatically calculates total price figure.
 */

import styled from '@emotion/styled'
import { Card } from '@eurofurence/reg-component-library'
import InvoiceItemComponent from './item'
import Footer from './footer'
import { sum } from 'ramda'
import { Localized } from '@fluent/react'
import { FluentVariable } from '@fluent/bundle'
import { DeepReadonly } from 'utility-types'

const InvoiceCard = styled(Card)`
	grid-column: 10 / span 3;
	align-self: start;
`

export interface InvoiceItem {
	readonly message: {
		readonly id: string
		readonly vars?: DeepReadonly<Record<string, FluentVariable>>
	}
	readonly amount: number
	readonly unitPrice: number
}

export interface InvoiceProps {
	readonly title: string
	readonly items: readonly InvoiceItem[]
}

const Invoice = ({ title, items }: InvoiceProps) =>
	<InvoiceCard inverted={true}>
		<header>
			<h1>{title}</h1>
		</header>
		<div>
			<ul>
				{items.map(({ message: { id, vars }, amount, unitPrice }) =>
					<Localized key={id} id={`invoice-item-${id}`} attrs={{ name: true, extra: true }} vars={vars}>
						<InvoiceItemComponent amount={amount} name={id} price={amount * unitPrice}/>
					</Localized>,
				)}
			</ul>
		</div>
		<Footer totalPrice={sum(items.map(({ amount, unitPrice }) => amount * unitPrice))}/>
	</InvoiceCard>

export default Invoice
