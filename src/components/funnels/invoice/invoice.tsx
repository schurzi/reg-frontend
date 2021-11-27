/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { Card } from '@eurofurence/reg-component-library'
import InvoiceItem from './item'
import Footer from './footer'

const InvoiceCard = styled(Card)`
	grid-column: 10 / span 3;
	align-self: start;
`

const Invoice = () => {
	// todo: load data from state

	return <InvoiceCard inverted={true}>
		<header>
			<Localized id="register-invoice-title"><h1>Your registration</h1></Localized>
		</header>
		<div>
			<ul>
				<InvoiceItem label="1 x Full conv." price={155} extra="August 11 - 15"/>
				<InvoiceItem label="1 x Stage pass" price={5}/>
				<InvoiceItem label="1 x T-shirt" price={0} extra="XXL"/>
			</ul>
		</div>
		<Footer totalPrice={90}/>
	</InvoiceCard>
}

export default Invoice
