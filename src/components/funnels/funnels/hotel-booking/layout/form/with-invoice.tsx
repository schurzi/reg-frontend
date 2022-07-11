import { Localized } from '@fluent/react'
import { ReactNode } from 'react'
import WithInvoiceFunnelLayout from '~/components/funnels/layout/with-invoice'
import HotelBookingHeader from '../header'

export interface WithInvoiceHotelBookingFunnelLayoutProps {
	children: ReactNode
	isFirstPage?: boolean
	onNext: () => void
}

const WithInvoiceHotelBookingFunnelLayout = ({ children, isFirstPage, onNext }: WithInvoiceHotelBookingFunnelLayoutProps) => {
	// todo: calculate invoiceItems from state

	return <Localized id="hotel-booking-invoice-layout" attrs={{ invoiceTitle: true }}>
		<WithInvoiceFunnelLayout
			header={<HotelBookingHeader isFirstPage={isFirstPage}/>}
			isFirstPage={isFirstPage}
			onNext={onNext}
			invoiceTitle="Your hotel room"
			invoiceItems={[
				{ amount: 5, name: 'Standard', unitPrice: 140, extra: 'August 11 - 15'},
			]}
		>
			{children}
		</WithInvoiceFunnelLayout>
	</Localized>
}

export default WithInvoiceHotelBookingFunnelLayout
