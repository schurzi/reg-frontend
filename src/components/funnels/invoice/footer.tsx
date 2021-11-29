import styled from '@emotion/styled'
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
	<Localized id="register-invoice-total-label"><Label>Total</Label></Localized>
	<Localized id="register-price" vars={{ price: totalPrice }}><TotalPrice>{totalPrice} €</TotalPrice></Localized>
	<Localized id="register-invoice-total-taxesnotice"><TaxesNotice>Taxes included</TaxesNotice></Localized>
</Container>

export default Footer
