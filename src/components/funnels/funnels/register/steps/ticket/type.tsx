import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { RadioGroup, RadioCard } from '@eurofurence/reg-component-library'
import FullWidthRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/full-width'
import { useFunnelForm } from '~/hooks/funnels/form'
import { StaticImage } from 'gatsby-plugin-image'
import { funnelStep } from '~/components/funnels/funnels/register/funnel-step'

const TicketTypeGrid = styled.div`
	display: flex;
	gap: 20px;

	> * {
		flex: 1;
	}
`

const ConCat = styled.figure`
	position: relative;
`

const TicketType = () => {
	const { register, handleSubmit } = useFunnelForm('register-ticket-type')

	return <FullWidthRegisterFunnelLayout onNext={handleSubmit}>
		<form onSubmit={handleSubmit}>
			<RadioGroup name="type">
				<TicketTypeGrid>
					<Localized id="register-ticket-type-day" attrs={{ label: true }}>
						<RadioCard label="Day ticket" value="day" {...register('type', { required: true })}>
							<ConCat><StaticImage src="../../../../../../images/con-cats/ticket-types/day.png" alt=""/></ConCat>
						</RadioCard>
					</Localized>
					<Localized id="register-ticket-type-full" attrs={{ label: true }}>
						<RadioCard label="Full convention" value="full" {...register('type', { required: true })}>
							<ConCat><StaticImage src="../../../../../../images/con-cats/ticket-types/full.png" alt=""/></ConCat>
						</RadioCard>
					</Localized>
				</TicketTypeGrid>
			</RadioGroup>
		</form>
	</FullWidthRegisterFunnelLayout>
}

export default funnelStep(0)(TicketType)
