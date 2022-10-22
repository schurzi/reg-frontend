import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { RadioGroup, RadioCard } from '@eurofurence/reg-component-library'
import FullWidthRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/full-width'
import { useFunnelForm } from '~/hooks/funnels/form'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import conCatDay from '~/images/con-cats/ticket-types/day.png'
import conCatFull from '~/images/con-cats/ticket-types/full.png'

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

const ConCatImage = styled.img`
	width: 100%;
`

const TicketType = (_: ReadonlyRouteComponentProps) => {
	const { register, handleSubmit } = useFunnelForm('register-ticket-type')

	return <FullWidthRegisterFunnelLayout onNext={handleSubmit} currentStep={0}>
		<form onSubmit={handleSubmit}>
			<RadioGroup name="type">
				<TicketTypeGrid>
					<Localized id="register-ticket-type-day" attrs={{ label: true }}>
						<RadioCard label="Day ticket" value="day" {...register('type', { required: true })}>
							<ConCat><ConCatImage src={conCatDay}/></ConCat>
						</RadioCard>
					</Localized>
					<Localized id="register-ticket-type-full" attrs={{ label: true }}>
						<RadioCard label="Full convention" value="full" {...register('type', { required: true })}>
							<ConCat><ConCatImage src={conCatFull}/></ConCat>
						</RadioCard>
					</Localized>
				</TicketTypeGrid>
			</RadioGroup>
		</form>
	</FullWidthRegisterFunnelLayout>
}

export default TicketType
