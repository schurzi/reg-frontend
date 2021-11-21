/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { forwardRef, ForwardedRef } from 'react'
import { Localized } from '@fluent/react'
import { Checkbox, CheckboxProps, Select } from '@eurofurence/reg-component-library'
import ReactMarkdown from 'react-markdown'

export interface TicketLevelAddonProps extends CheckboxProps {
	readonly children: string
	readonly price: number
}

const CheckboxWrapper = styled.section`
	font-size: 2rem;
`

const Container = styled.section`
	display: flex;
	align-items: start;

	&:not(:first-child) {
		margin-top: 6.4rem;
	}

	&:not(:last-child) {
		margin-bottom: 6.4rem;
	}
`

const DescriptionContainer = styled.section`
	flex: 1;
`

const Description = styled.section`
	margin-top: 1.6rem;
	max-width: 600px;
`

const PriceContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: end;
`

const Price = styled.section`
	font-family: Roboto;
	font-weight: 700;
	font-size: 2.4rem;

	label[data-checked] & {
		color: var(--color-semantic-info);
	}
`

const DropdownContainer = styled.div`
	width: 22rem;
`

const TicketLevelAddon = forwardRef(({ children, price, ...rest }: TicketLevelAddonProps, ref: ForwardedRef<HTMLInputElement>) =>
	<Container>
		<DescriptionContainer>
			<CheckboxWrapper><Checkbox ref={ref} {...rest}/></CheckboxWrapper>
			<Description><ReactMarkdown>{children}</ReactMarkdown></Description>
		</DescriptionContainer>
		<PriceContainer>
			<Localized id="register-ticket-level-price" vars={{ price }}><Price>{price} €</Price></Localized>
			{/* <DropdownContainer>
				<Select name="size" label="T-shirt size" options={[
					{ value: 'S', label: 'S' },
					{ value: 'M', label: 'M' },
					{ value: 'L', label: 'L' },
					{ value: 'XL', label: 'XL' },
					{ value: 'XXL', label: 'XXL' },
				]}/>
			</DropdownContainer> */}
		</PriceContainer>
	</Container>
)

export default TicketLevelAddon
