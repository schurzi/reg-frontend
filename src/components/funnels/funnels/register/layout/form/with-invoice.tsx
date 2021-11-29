import { Localized } from '@fluent/react'
import { ReactNode } from 'react'
import WithInvoiceFunnelLayout from '~/components/funnels/layout/with-invoice'
import RegisterHeader from '../header'

export interface WithInvoiceRegisterFunnelLayoutProps {
	children: ReactNode
	currentStep: number
	onNext: () => void
}

const WithInvoiceRegisterFunnelLayout = ({ children, currentStep, onNext }: WithInvoiceRegisterFunnelLayoutProps) => {
	// todo: calculate invoiceItems from state

	return <Localized id="register-invoice-layout" attrs={{ invoiceTitle: true }}>
		<WithInvoiceFunnelLayout
			header={<RegisterHeader currentStep={currentStep}/>}
			isFirstPage={currentStep === 0}
			onNext={onNext}
			invoiceTitle="Your registration"
			invoiceItems={[
				{ amount: 1, name: 'Full conv.', unitPrice: 155, extra: 'August 11 - 15'},
				{ amount: 1, name: 'Stage pass', unitPrice: 5 },
				{ amount: 1, name: 'T-shirt', unitPrice: 0, extra: 'XXL' },
			]}
		>
			{children}
		</WithInvoiceFunnelLayout>
	</Localized>
}

export default WithInvoiceRegisterFunnelLayout
