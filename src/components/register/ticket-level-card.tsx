/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { ChangeEventHandler, forwardRef, FocusEventHandler } from 'react'
import { Localized } from '@fluent/react'
import { RadioCard } from '@eurofurence/reg-component-library'
import { DateTime } from 'luxon'
import ReactMarkdown from 'react-markdown'

export interface TicketLevelCardProps {
	readonly id: string
	readonly name: string
	readonly label: string
	readonly price: number
	readonly priceLabel: string
	readonly expirationDate: DateTime
	readonly children: string
	readonly onChange?: ChangeEventHandler
	readonly onBlur?: FocusEventHandler
}

const Footer = styled.footer`
	display: flex;
	align-items: center;
`

const PriceLabelContainer = styled.section`
	flex: 1;
`

const PriceLabel = styled.p`
	margin-bottom: 0px !important;
`

const ExpirationNotice = styled.aside`
	font-size: 1.2rem;
	color: var(--color-grays-400);
`

const Price = styled.section`
	font-family: Roboto;
	font-weight: 700;
	font-size: 2.4rem;

	label[data-checked] & {
		color: var(--color-semantic-info);
	}
`

const TicketLevelCard = forwardRef(({ id, label, price, priceLabel, expirationDate, children, onChange, onBlur }: TicketLevelCardProps) =>
	<RadioCard label={label} value={id} onChange={onChange} onBlur={onBlur}>
		<div><ReactMarkdown>{children}</ReactMarkdown></div>
		<Footer>
			<PriceLabelContainer>
				<PriceLabel>{priceLabel}</PriceLabel>
				<Localized id="register-ticket-level-expiration-notice" vars={{ expirationDate: expirationDate.toJSDate() }}>
					<ExpirationNotice>Register before {expirationDate.toString()}</ExpirationNotice>
				</Localized>
			</PriceLabelContainer>
			<Localized id="register-ticket-level-price" vars={{ price }}><Price>{price} €</Price></Localized>
		</Footer>
	</RadioCard>
)

export default TicketLevelCard
