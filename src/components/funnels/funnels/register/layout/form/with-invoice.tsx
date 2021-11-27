import { ReactNode } from 'react'
import WithInvoiceFunnelLayout from '~/components/funnels/layout/with-invoice'
import RegisterHeader from '../header'

export interface WithInvoiceRegisterFunnelLayoutProps {
	children: ReactNode
	currentStep: number
	onNext: () => void
}

const WithInvoiceRegisterFunnelLayout = ({ children, currentStep, onNext }: WithInvoiceRegisterFunnelLayoutProps) =>
	<WithInvoiceFunnelLayout
		header={<RegisterHeader currentStep={currentStep}/>}
		isFirstPage={currentStep === 0}
		onNext={onNext}
	>
		{children}
	</WithInvoiceFunnelLayout>

export default WithInvoiceRegisterFunnelLayout
