import { ReactNode } from 'react'
import FullWidthFunnelLayout from '~/components/funnels/layout/full-width'
import HotelBookingHeader from '../header'

export interface FullWidthHotelBookingFunnelLayoutProps {
	children: ReactNode
	isFirstPage?: boolean
	onNext: () => void
}

const FullWidthHotelBookingFunnelLayout = ({ children, isFirstPage, onNext }: FullWidthHotelBookingFunnelLayoutProps) =>
	<FullWidthFunnelLayout
		header={<HotelBookingHeader isFirstPage={isFirstPage}/>}
		isFirstPage={isFirstPage}
		onNext={onNext}
	>
		{children}
	</FullWidthFunnelLayout>

export default FullWidthHotelBookingFunnelLayout
