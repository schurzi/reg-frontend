/*
 * The footer for the invoice.
 */

import styled from '@emotion/styled'
import { FluentNumber } from '@fluent/bundle'
import { Localized } from '@fluent/react'

const Container = styled.footer`
	display: grid;
	grid-template: "label price" auto
	               "taxes taxes" auto / auto auto;
	align-items: center;
`

const Label = styled.div`
	grid-area: label;

	font-size: 1.8rem;
`

const TotalPrice = styled.div`
	grid-area: price;

	text-align: right;

	font-size: 2.0rem;
	font-weight: 700;
`

const TaxesNotice = styled.div`
	grid-area: taxes;

	color: var(--color-brand-2-100);

	text-align: right;
	font-size: 1.4rem;
`

export interface FooterProps {
	readonly totalPrice: number
}

const Footer = ({ totalPrice }: FooterProps) => <Container>
	<Localized id="invoice-total-label"><Label>Total</Label></Localized>
	<Localized id="price" vars={{ price: new FluentNumber(totalPrice, { style: 'currency', currency: 'EUR' }) }}><TotalPrice>{totalPrice} €</TotalPrice></Localized>
	<Localized id="invoice-total-taxesnotice"><TaxesNotice>Taxes included</TaxesNotice></Localized>
</Container>

export default Footer
