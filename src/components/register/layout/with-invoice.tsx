/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { Form } from '@eurofurence/reg-component-library'
import Invoice from '~/components/register/invoice/invoice'
import CommonRegisterLayout from './common'

export interface WithInvoiceRegisterLayoutProps {
	readonly onSubmit: () => void
	readonly children: ReactNode
}

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 24px;
`

const GridConformer = styled.div`
	grid-column: span 8;
`

const WithInvoiceRegisterLayout = ({ children, onSubmit }: WithInvoiceRegisterLayoutProps) =>
	<CommonRegisterLayout onNext={onSubmit}>
		<Grid>
			<GridConformer>
				<Form onSubmit={onSubmit}>
					{children}
				</Form>
			</GridConformer>
			<Invoice/>
		</Grid>
	</CommonRegisterLayout>

export default WithInvoiceRegisterLayout
