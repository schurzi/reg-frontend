/*
 * Layout for registration funnel pages that spans the full width of the page.
 */

import FullWidthFunnelLayout from '~/components/funnels/layout/full-width'
import type { ReadonlyReactNode } from '~/util/readonly-types'
import RegisterHeader from '../header'

export interface FullWidthRegisterFunnelLayoutProps {
	readonly children: ReadonlyReactNode
	readonly onNext: () => void
}

const FullWidthRegisterFunnelLayout = ({ children, onNext }: FullWidthRegisterFunnelLayoutProps) =>
	<FullWidthFunnelLayout
		header={<RegisterHeader/>}
		onNext={onNext}
	>
		{children}
	</FullWidthFunnelLayout>

export default FullWidthRegisterFunnelLayout
