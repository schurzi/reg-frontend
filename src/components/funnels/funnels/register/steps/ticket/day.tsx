import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { RadioGroup, RadioCard, MediaQueries } from '@eurofurence/reg-component-library'
import config from '~/config'
import { useFunnelForm } from '~/hooks/funnels/form'
import FullWidthRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/full-width'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import { formatISOWithOptions, eachDayOfInterval, getDay } from 'date-fns/fp'
import { StaticImage } from 'gatsby-plugin-image'

const Grid = styled.div`
	display: grid;
	gap: 20px;

	@media (max-width: 649.99px) {
		grid: auto-flow 1fr / 1fr;
	}

	@media (min-width: 650px) and (max-width: 799.99px) {
		grid: auto-flow 1fr / repeat(2, 1fr);
	}

	@media ${MediaQueries.laptop}, ${MediaQueries.desktop} {
		grid: auto-flow 1fr / repeat(3, 1fr);
	}
`

const ConCat = styled.figure`
	position: relative;
`

const TicketDay = (_: ReadonlyRouteComponentProps) => {
	const { register, handleSubmit } = useFunnelForm('register-ticket-day')

	/* eslint-disable react/jsx-key */
	const conCats = [
		<StaticImage src="../../../../../../images/con-cats/days/sunday.png" alt=""/>,
		<StaticImage src="../../../../../../images/con-cats/days/monday.png" alt=""/>,
		<StaticImage src="../../../../../../images/con-cats/days/tuesday.png" alt=""/>,
		<StaticImage src="../../../../../../images/con-cats/days/wednesday.png" alt=""/>,
		<StaticImage src="../../../../../../images/con-cats/days/thursday.png" alt=""/>,
		<StaticImage src="../../../../../../images/con-cats/days/friday.png" alt=""/>,
		<StaticImage src="../../../../../../images/con-cats/days/saturday.png" alt=""/>,
	]
	/* eslint-enable react/jsx-key */

	return <FullWidthRegisterFunnelLayout onNext={handleSubmit} currentStep={0} showBack={true}>
		<Localized id="register-ticket-day-title"><h3>Select your ticket</h3></Localized>

		<form onSubmit={handleSubmit}>
			<RadioGroup name="day">
				<Grid>
					{eachDayOfInterval({ start: config.dayTicketStartDate, end: config.dayTicketEndDate }).map(date =>
						<Localized id="register-ticket-day-card" key={formatISOWithOptions({ representation: 'date' }, date)} attrs={{ label: true }} vars={{ date }}>
							<RadioCard label={date.toString()} value={formatISOWithOptions({ representation: 'date' }, date)} {...register('day', { required: true })}>
								<ConCat>{conCats[getDay(date)]!}</ConCat>
							</RadioCard>
						</Localized>,
					)}
				</Grid>
			</RadioGroup>
		</form>
	</FullWidthRegisterFunnelLayout>
}

export default TicketDay
