/*
 * Layout for funnel pages that has a blue invoice on the right side.
 */

import styled from '@emotion/styled'
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
	@media (min-width: 1260px) {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 24px;
	}
`

const GridConformer = styled.div`
	@media (min-width: 1260px) {
		grid-column: span 8;
	}
`

const WithInvoiceFunnelLayout = ({ children, onNext, invoiceTitle, invoiceEditLink, invoice, onPay, ...passthroughProps }: WithInvoiceFunnelLayoutProps) =>
	<StepFunnelLayout {...passthroughProps} onNext={onNext}>
		<Grid>
			<GridConformer>
				{children}
			</GridConformer>
			<InvoiceComponent title={invoiceTitle} editLink={invoiceEditLink} invoice={invoice} onPay={onPay}/>
		</Grid>
	</StepFunnelLayout>

export default WithInvoiceFunnelLayout
