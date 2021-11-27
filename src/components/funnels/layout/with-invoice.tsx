/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Invoice from '~/components/funnels/invoice/invoice'
import CommonFunnelLayout from './common'

export interface WithInvoiceFunnelLayoutProps {
	readonly header?: ReactNode
	readonly children: ReactNode
	readonly isFirstPage?: boolean
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

const WithInvoiceFunnelLayout = ({ children, onNext, ...passthroughProps }: WithInvoiceFunnelLayoutProps) =>
	<CommonFunnelLayout {...passthroughProps} onNext={onNext}>
		<Grid>
			<GridConformer>
				{children}
			</GridConformer>
			<Invoice/>
		</Grid>
	</CommonFunnelLayout>

export default WithInvoiceFunnelLayout
