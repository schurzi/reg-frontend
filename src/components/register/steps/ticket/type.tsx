/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { RouteComponentProps } from '@reach/router'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioCard } from '@eurofurence/reg-component-library'
import FullWidthRegisterLayout from '../../layout/full-width'
import { useDispatch } from 'react-redux'
import { TicketType as TicketTypeModel } from '../../../../state/models/register'
import { SubmitTicketType } from '../../../../state/actions/register'

const TicketTypeGrid = styled.div`
	display: flex;
	gap: 20px;

	> * {
		flex: 1;
	}
`

const TicketType = (_: RouteComponentProps) => {
	const { register, handleSubmit } = useForm<{ type: TicketTypeModel['type'] }>()
	const dispatch = useDispatch()

	return <FullWidthRegisterLayout onSubmit={handleSubmit(data => dispatch(SubmitTicketType.create(data.type)))}>
		<RadioGroup name="type">
			<TicketTypeGrid>
				<Localized id="register-ticket-type-day-label" attrs={{ label: true }}>
					<RadioCard label="Day ticket" value="day" height="346px" {...register('type')}/>
				</Localized>
				<Localized id="register-ticket-type-full-label" attrs={{ label: true }}>
					<RadioCard label="Full convention" value="full" height="346px" {...register('type')}/>
				</Localized>
			</TicketTypeGrid>
		</RadioGroup>
	</FullWidthRegisterLayout>
}

export default TicketType
