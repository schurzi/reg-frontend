import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Invoice, { InvoiceItem } from '~/components/funnels/invoice/invoice'
import CommonFunnelLayout from './common'

export interface WithInvoiceFunnelLayoutProps {
	readonly header?: ReactNode
	readonly children: ReactNode
	readonly isFirstPage?: boolean
	readonly invoiceTitle: string
	readonly invoiceItems: InvoiceItem[]
	readonly onNext: () => void
}

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 24px;
`

const GridConformer = styled.div`
	grid-column: span 8;
`

const WithInvoiceFunnelLayout = ({ children, onNext, invoiceTitle, invoiceItems, ...passthroughProps }: WithInvoiceFunnelLayoutProps) =>
	<CommonFunnelLayout {...passthroughProps} onNext={onNext}>
		<Grid>
			<GridConformer>
				{children}
			</GridConformer>
			<Invoice title={invoiceTitle} items={invoiceItems}/>
		</Grid>
	</CommonFunnelLayout>

export default WithInvoiceFunnelLayout
