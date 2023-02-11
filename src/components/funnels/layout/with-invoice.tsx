/*
 * Layout for funnel pages that has a blue invoice on the right side.
 */

import styled from '@emotion/styled'
import { MediaQueries } from '@eurofurence/reg-component-library'
import InvoiceComponent from '~/components/funnels/invoice/invoice'
import { Invoice } from '~/state/models/invoice'
import type { ReadonlyReactNode } from '~/util/readonly-types'
import StepFunnelLayout from './step'

export interface WithInvoiceFunnelLayoutProps {
	readonly header?: ReadonlyReactNode
	readonly children: ReadonlyReactNode
	readonly isFirstPage?: boolean
	readonly isLastPage?: boolean
	readonly invoiceTitle: string
	readonly invoiceEditLink?: string
	readonly invoice: Invoice
	readonly onNext: () => void
	readonly onPay?: () => void
}

const Grid = styled.div`
	@media ${MediaQueries.laptop}, ${MediaQueries.desktop} {
		display: grid;
		grid-template-columns: auto max-content;
		gap: 111px;
	}
`

const WithInvoiceFunnelLayout = ({ children, onNext, invoiceTitle, invoiceEditLink, invoice, onPay, ...passthroughProps }: WithInvoiceFunnelLayoutProps) =>
	<StepFunnelLayout {...passthroughProps} onNext={onNext}>
		<Grid>
			<div>
				{children}
			</div>
			<InvoiceComponent title={invoiceTitle} editLink={invoiceEditLink} invoice={invoice} onPay={onPay}/>
		</Grid>
	</StepFunnelLayout>

export default WithInvoiceFunnelLayout
