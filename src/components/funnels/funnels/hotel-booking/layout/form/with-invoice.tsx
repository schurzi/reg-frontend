import { Localized } from '@fluent/react'
import type { ReadonlyReactNode } from '~/util/readonly-types'
import WithInvoiceFunnelLayout from '~/components/funnels/layout/with-invoice'
import HotelBookingHeader from '../header'
import { buildInvoice } from '~/state/models/invoice'

export interface WithInvoiceHotelBookingFunnelLayoutProps {
	readonly children: ReadonlyReactNode
	readonly isFirstPage?: boolean
	readonly onNext: () => void
}

const WithInvoiceHotelBookingFunnelLayout = ({ children, isFirstPage, onNext }: WithInvoiceHotelBookingFunnelLayoutProps) => {
	// todo: calculate invoice from state

	return <Localized id="hotel-booking-invoice-layout" attrs={{ invoiceTitle: true }}>
		<WithInvoiceFunnelLayout
			header={<HotelBookingHeader isFirstPage={isFirstPage}/>}
			isFirstPage={isFirstPage}
			onNext={onNext}
			invoiceTitle="Your hotel room"
			invoice={buildInvoice([
				{ amount: 5, id: 'hotel-booking-room-type-standard', unitPrice: 140 },
			])}
		>
			{children}
		</WithInvoiceFunnelLayout>
	</Localized>
}

export default WithInvoiceHotelBookingFunnelLayout
