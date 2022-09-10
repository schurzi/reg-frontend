/*
 * Layout for registration funnel pages that has a blue invoice on the right side.
 */

import { Localized } from '@fluent/react'
import { InvoiceItem } from '~/components/funnels/invoice/invoice'
import WithInvoiceFunnelLayout from '~/components/funnels/layout/with-invoice'
import config from '~/config'
import { useAppSelector } from '~/hooks/redux'
import { getTicketLevel, getTicketType } from '~/state/selectors/register'
import type { ReadonlyReactNode } from '~/util/readonly-types'
import RegisterHeader from '../header'

export interface WithInvoiceRegisterFunnelLayoutProps {
	readonly children: ReadonlyReactNode
	readonly currentStep: number
	readonly onNext: () => void
}


const WithInvoiceRegisterFunnelLayout = ({ children, currentStep, onNext }: WithInvoiceRegisterFunnelLayoutProps) => {
	const invoiceItems = useAppSelector(state => {
		const ticketLevel = getTicketLevel()(state)
		const ticketType = getTicketType()(state)

		if (ticketLevel === undefined || ticketType === undefined) {
			return []
		}

		const ticketLine: InvoiceItem = ticketType.type === 'day'
			? {
				amount: 1,
				message: {
					id: 'register-ticket-type-day',
					vars: { day: new Date(ticketType.day) },
				},
				unitPrice: config.ticketLevels.find(l => l.id === ticketLevel.level)!.prices.day,
			}
			: {
				amount: 1,
				message: {
					id: 'register-ticket-type-full',
					vars: { start: new Date(config.eventStartDate), end: new Date(config.eventEndDate) },
				},
				unitPrice: config.ticketLevels.find(l => l.id === ticketLevel.level)!.prices.full,
			}

		const stagePassLine = ticketLevel.addons.stagePass.selected
			? [{ amount: 1, message: { id: 'register-ticket-addons-stage-pass' }, unitPrice: config.stagePassPrice }]
			: []

		const tshirtLine = ticketLevel.addons.tshirt.selected
			? [{ amount: 1, message: { id: 'register-ticket-addons-tshirt', vars: { size: ticketLevel.addons.tshirt.size } }, unitPrice: config.tshirtPrice }]
			: []

		return [ticketLine, ...stagePassLine, ...tshirtLine]
	})

	return <Localized id="register-invoice-layout" attrs={{ invoiceTitle: true }}>
		<WithInvoiceFunnelLayout
			header={<RegisterHeader currentStep={currentStep}/>}
			isFirstPage={currentStep === 0}
			onNext={onNext}
			invoiceTitle="Your registration"
			invoiceItems={invoiceItems}
		>
			{children}
		</WithInvoiceFunnelLayout>
	</Localized>
}

export default WithInvoiceRegisterFunnelLayout
