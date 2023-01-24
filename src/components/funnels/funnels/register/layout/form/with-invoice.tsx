/*
 * Layout for registration funnel pages that has a blue invoice on the right side.
 */

import { Localized } from '@fluent/react'
import WithInvoiceFunnelLayout from '~/components/funnels/layout/with-invoice'
import { useAppSelector } from '~/hooks/redux'
import { buildInvoice } from '~/state/models/invoice'
import { getInvoice } from '~/state/selectors/register'
import type { ReadonlyReactNode } from '~/util/readonly-types'
import RegisterHeader from '../header'

export interface WithInvoiceRegisterFunnelLayoutProps {
	readonly children: ReadonlyReactNode
	readonly onNext: () => void
}

const WithInvoiceRegisterFunnelLayout = ({ children, onNext }: WithInvoiceRegisterFunnelLayoutProps) => {
	const invoice = useAppSelector(getInvoice)

	return <Localized id="register-invoice-layout" attrs={{ invoiceTitle: true }}>
		<WithInvoiceFunnelLayout
			header={<RegisterHeader/>}
			onNext={onNext}
			invoiceTitle="Your registration"
			invoice={invoice ?? buildInvoice([])}
		>
			{children}
		</WithInvoiceFunnelLayout>
	</Localized>
}

export default WithInvoiceRegisterFunnelLayout
