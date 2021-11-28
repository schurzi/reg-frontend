/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { RouteComponentProps } from '@reach/router'
import { RadioGroup } from '@eurofurence/reg-component-library'
import { useSiteMetadata } from '~/hooks/queries/site-metadata'
import RoomCard from './room/card'
import FullWidthRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/full-width'
import { ChangeRoomInfo, SubmitRoomInfo } from '~/state/actions/hotel-booking'
import { RoomInfo as RoomInfoModel } from '~/state/models/hotel-booking'
import { useFunnelForm } from '~/hooks/funnels/form'

const RoomSection = styled.section`
	margin-top: 1.5em;
`

const RoomGrid = styled.section`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 2em;
`

const RoomInfo = (_: RouteComponentProps) => {
	const { register, handleSubmit } = useFunnelForm<RoomInfoModel>(ChangeRoomInfo, SubmitRoomInfo)
	const { rooms } = useSiteMetadata()

	return <FullWidthRegisterFunnelLayout onNext={handleSubmit} currentStep={1}>
		<h1>Welcome to Eurofurence 2022!</h1>
		<p>In order to speed up hotel booking and increase your chances of securing a room, you can enter your preferred dates, hotel room, contact and guest information on the following pages. We will then generate an email template for you, which you can copy and paste into your email client.</p>
		<p>Once booking starts, the secret code in the message below will be revealed. <span className="important">You need this code for the hotel to accept your booking.</span></p>
		<p>The secret code will also be sent out on our <a>Twitter</a> and <a>Telegram</a> accounts.</p>

		<form onSubmit={handleSubmit}>
			<h3>Choose your hotel room</h3>
			<p>You will still need to book your hotel room directly through the hotel website. Filling out the information below will generate an email template, which you can use for booking your room.</p>

			<section>
				Selectors go here.
			</section>


			<RoomSection>
				<Localized id="hotel-booking-room-title"><h3>RoomInfo types</h3></Localized>
				<RoomGrid>
					<RadioGroup name="level">
						{rooms.map(({ id, price }) =>
							<Localized key={id} id={`hotel-booking-room-card-${id}`} attrs={{ label: true, priceLabel: true }}>
								<RoomCard id={id} price={price} label="Room type" {...register('type')}>A room type</RoomCard>
							</Localized>
						)}
					</RadioGroup>
				</RoomGrid>
			</RoomSection>
		</form>
	</FullWidthRegisterFunnelLayout>
}

export default RoomInfo
