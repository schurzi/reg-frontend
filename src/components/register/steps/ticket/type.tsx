/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { useEffect } from 'react'
import { Localized } from '@fluent/react'
import { RouteComponentProps } from '@reach/router'
import { useForm } from 'react-hook-form'
import { RadioGroup, RadioCard } from '@eurofurence/reg-component-library'
import FullWidthRegisterLayout from '../../layout/full-width'
import { TicketType as TicketTypeModel } from '../../../../state/models/register'
import { ChangeTicketType, SubmitTicketType } from '../../../../state/actions/register'
import { useAppDispatch } from '../../../../hooks/redux'

const TicketTypeGrid = styled.div`
	display: flex;
	gap: 20px;

	> * {
		flex: 1;
	}
`

const TicketType = (_: RouteComponentProps) => {
	const { register, watch, handleSubmit } = useForm<{ type: TicketTypeModel['type'] }>()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const subscription = watch(data => dispatch(ChangeTicketType.create(data.type)))

		return subscription.unsubscribe
	})

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
