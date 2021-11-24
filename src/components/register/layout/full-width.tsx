/** @jsxImportSource @emotion/react */

import { ReactNode } from 'react'
import CommonRegisterLayout from './common'

export interface FullWidthRegisterLayoutProps {
	readonly onSubmit: () => void
	readonly children: ReactNode
}

const FullWidthRegisterLayout = ({ children, onSubmit }: FullWidthRegisterLayoutProps) =>
	<CommonRegisterLayout first={true} onNext={onSubmit}>
		<form onSubmit={onSubmit}>
			{children}
		</form>
	</CommonRegisterLayout>

export default FullWidthRegisterLayout
