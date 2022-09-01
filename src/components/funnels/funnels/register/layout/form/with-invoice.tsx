/*
 * Layout for registration funnel pages that has a blue invoice on the right side.
 */

import { Localized, useLocalization } from '@fluent/react'
import WithInvoiceFunnelLayout from '~/components/funnels/layout/with-invoice'
import config from '~/config'
import { useAppSelector } from '~/hooks/redux'
import { useCurrentLangKey } from '~/localization'
import { getTicketLevel, getTicketType } from '~/state/selectors/register'
import type { ReadonlyReactNode } from '~/util/readonly-types'
import RegisterHeader from '../header'

export interface WithInvoiceRegisterFunnelLayoutProps {
	readonly children: ReadonlyReactNode
	readonly currentStep: number
	readonly onNext: () => void
}


const WithInvoiceRegisterFunnelLayout = ({ children, currentStep, onNext }: WithInvoiceRegisterFunnelLayoutProps) => {
	const langKey = useCurrentLangKey()
	const { l10n } = useLocalization()

	const dateFormatter = new Intl.DateTimeFormat([langKey, 'en'], { month: 'long', day: 'numeric' })

	const invoiceItems = useAppSelector(state => {
		const ticketLevel = getTicketLevel()(state)
		const ticketType = getTicketType()(state)

		if (ticketLevel === undefined || ticketType === undefined) {
			return []
		}

		const ticketLine = ticketType.type === 'day'
			? {
				amount: 1,
				name: l10n.getString('register-invoice-ticket-type-day', undefined, 'Day ticket'),
				extra: dateFormatter.format(new Date(ticketType.day)),
				unitPrice: config.ticketLevels.find(l => l.id === ticketLevel.level)!.prices.day,
			}
			: {
				amount: 1,
				name: l10n.getString('register-invoice-ticket-type-full', undefined, 'Full conv.'),
				extra: dateFormatter.formatRange(new Date(config.eventStartDate), new Date(config.eventEndDate)),
				unitPrice: config.ticketLevels.find(l => l.id === ticketLevel.level)!.prices.full,
			}

		const stagePassLine = ticketLevel.addons.stagePass.selected
			? [{ amount: 1, name: l10n.getString('register-invoice-addons-stage-pass', undefined, 'Stage pass'), unitPrice: config.stagePassPrice }]
			: []

		const tshirtLine = ticketLevel.addons.tshirt.selected
			? [{ amount: 1, name: l10n.getString('register-invoice-addons-tshirt', undefined, 'T-shirt'), unitPrice: config.tshirtPrice }]
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
