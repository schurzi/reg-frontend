/*
 * Layout for registration funnel pages that spans the full width of the page.
 */

import { ReactNode } from 'react'
import FullWidthFunnelLayout from '~/components/funnels/layout/full-width'
import RegisterHeader from '../header'

export interface FullWidthRegisterFunnelLayoutProps {
	children: ReactNode
	currentStep: number
	onNext: () => void
}

const FullWidthRegisterFunnelLayout = ({ children, currentStep, onNext }: FullWidthRegisterFunnelLayoutProps) =>
	<FullWidthFunnelLayout
		header={<RegisterHeader currentStep={currentStep}/>}
		isFirstPage={currentStep === 0}
		onNext={onNext}
	>
		{children}
	</FullWidthFunnelLayout>

export default FullWidthRegisterFunnelLayout
