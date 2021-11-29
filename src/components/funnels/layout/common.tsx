import { ReactNode } from 'react'
import Footer from './footer'

export interface CommonFunnelLayoutProps {
	readonly children: ReactNode
	readonly header?: ReactNode
	readonly isFirstPage?: boolean
	readonly onNext: () => void
}

const CommonFunnelLayout = ({ children, header: headerContent, isFirstPage = false, onNext }: CommonFunnelLayoutProps) => <>
	<header>
		{headerContent}
	</header>
	{children}
	<Footer canBack={!isFirstPage} onNext={onNext}/>
</>

export default CommonFunnelLayout
