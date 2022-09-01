import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { navigate } from '@reach/router'
import { RadioGroup, RadioCard } from '@eurofurence/reg-component-library'
import config from '~/config'
import { ChangeTicketDay, SubmitTicketDay } from '~/state/actions/register'
import { useFunnelForm } from '~/hooks/funnels/form'
import FullWidthRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/full-width'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import { formatISOWithOptions } from 'date-fns/fp'
import { eachDayOfInterval } from 'date-fns/esm'

const Grid = styled.div`
	display: grid;
	gap: 20px;
	grid: auto-flow 1fr / repeat(3, 1fr);
`

const TicketDay = (_: ReadonlyRouteComponentProps) => {
	const { register, handleSubmit } = useFunnelForm<{ day: string }>(ChangeTicketDay, SubmitTicketDay)

	return <FullWidthRegisterFunnelLayout onNext={handleSubmit} currentStep={0}>
		<form onSubmit={handleSubmit}>
			<RadioGroup name="day">
				<Grid>
					{eachDayOfInterval({ start: config.eventStartDate, end: config.eventEndDate }).map(date =>
						<Localized id="register-ticket-day-card" key={formatISOWithOptions({ representation: 'date' }, date)} attrs={{ label: true }} vars={{ date }}>
							<RadioCard label={date.toString()} value={formatISOWithOptions({ representation: 'date' }, date)} {...register('day')}/>
						</Localized>,
					)}
				</Grid>
			</RadioGroup>
			<br/>
			<Localized id="register-change-ticket-type"><a onClick={() => navigate(-1)}>Change ticket type</a></Localized>
		</form>
	</FullWidthRegisterFunnelLayout>
}

export default TicketDay
