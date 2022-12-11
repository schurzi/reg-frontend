import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { navigate } from '@reach/router'
import { RadioGroup, RadioCard } from '@eurofurence/reg-component-library'
import config from '~/config'
import { useFunnelForm } from '~/hooks/funnels/form'
import FullWidthRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/full-width'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import { formatISOWithOptions, eachDayOfInterval, getDay } from 'date-fns/fp'
import conCatWednesday from '~/images/con-cats/days/wednesday.png'
import conCatThursday from '~/images/con-cats/days/thursday.png'
import conCatFriday from '~/images/con-cats/days/friday.png'
import conCatSaturday from '~/images/con-cats/days/saturday.png'
import conCatSunday from '~/images/con-cats/days/sunday.png'

const Grid = styled.div`
	display: grid;
	gap: 20px;
	grid: auto-flow 1fr / repeat(3, 1fr);
`

const ConCat = styled.figure`
	position: relative;
`

const ConCatImage = styled.img`
	width: 100%;
`

const conCats = [conCatSunday, null, null, conCatWednesday, conCatThursday, conCatFriday, conCatSaturday]

const TicketDay = (_: ReadonlyRouteComponentProps) => {
	const { register, handleSubmit } = useFunnelForm('register-ticket-day')

	return <FullWidthRegisterFunnelLayout onNext={handleSubmit} currentStep={0} showBack={true}>
		<form onSubmit={handleSubmit}>
			<RadioGroup name="day">
				<Grid>
					{eachDayOfInterval({ start: config.eventStartDate, end: config.eventEndDate }).map(date =>
						<Localized id="register-ticket-day-card" key={formatISOWithOptions({ representation: 'date' }, date)} attrs={{ label: true }} vars={{ date }}>
							<RadioCard label={date.toString()} value={formatISOWithOptions({ representation: 'date' }, date)} {...register('day', { required: true })}>
								<ConCat><ConCatImage src={conCats[getDay(date)]!}/></ConCat>
							</RadioCard>
						</Localized>,
					)}
				</Grid>
			</RadioGroup>
		</form>
	</FullWidthRegisterFunnelLayout>
}

export default TicketDay
