/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { RouteComponentProps } from '@reach/router'
import { useForm } from 'react-hook-form'
import { DateTime } from 'luxon'
import { RadioGroup, Select } from '@eurofurence/reg-component-library'
import { useSiteMetadata } from '../../../../queries/site-metadata'
import TicketLevelCard from './level/card'
import TicketLevelAddon from './level/addon'
import FullWidthRegisterLayout from '../../layout/full-width'
import { SubmitTicketLevel } from '../../../../state/actions/register'
import { useDispatch } from 'react-redux'
import { TicketLevel as TicketLevelModel } from '../../../../state/models/register'

const TicketLevelSection = styled.section`
	margin-top: 1.5em;
`

const TicketLevelGrid = styled.section`
	display: grid;
	gap: 20px;
	grid: auto-flow 1fr / repeat(3, 1fr);
	margin-top: 2em;
`

const AddonsSection = styled.section`
	margin-top: 4.5em;
`

const AddonsContainer = styled.section`
	margin-top: 4.5em;
`

const TicketLevel = (_: RouteComponentProps) => {
	const { register, handleSubmit } = useForm<TicketLevelModel>()
	const { ticketLevels, registrationExpirationDate } = useSiteMetadata()
	const dispatch = useDispatch()

	const expirationDate = DateTime.fromISO(registrationExpirationDate)

	return <FullWidthRegisterLayout onSubmit={handleSubmit(data => dispatch(SubmitTicketLevel.create(data)))}>
		<TicketLevelSection>
			<Localized id="register-ticket-level-title"><h3>Select your ticket</h3></Localized>
			<TicketLevelGrid>
				<RadioGroup name="level">
					{ticketLevels.map(({ id, price }) =>
						<Localized key={id} id={`register-ticket-level-card-${id}`} attrs={{ label: true, priceLabel: true }}>
							<TicketLevelCard id={id} price={price} expirationDate={expirationDate} label="Ticket level" priceLabel="A ticket" {...register('level')}>A ticket level</TicketLevelCard>
						</Localized>
					)}
				</RadioGroup>
			</TicketLevelGrid>
		</TicketLevelSection>
		<AddonsSection>
			<Localized id="register-ticket-level-addons-title"><h3>Select add-ons</h3></Localized>
			<AddonsContainer>
				<Localized id="register-ticket-level-addons-item-stage-pass" attrs={{ label: true, description: true, price: true }}>
					<TicketLevelAddon label="Stage pass" description="A stage pass" price={5} {...register('addons.stagePass.selected')}/>
				</Localized>
				<Localized id="register-ticket-level-addons-item-tshirt" attrs={{ label: true, description: true, price: true }}>
					<TicketLevelAddon label="T-Shirt" description="A t-shirt" price={20} {...register('addons.tshirt.selected')}>
						<Select name="size" label="T-shirt size" options={[
							{ value: 'S', label: 'S' },
							{ value: 'M', label: 'M' },
							{ value: 'L', label: 'L' },
							{ value: 'XL', label: 'XL' },
							{ value: 'XXL', label: 'XXL' },
						]}/>
					</TicketLevelAddon>
				</Localized>
			</AddonsContainer>
		</AddonsSection>
	</FullWidthRegisterLayout>
}

export default TicketLevel
