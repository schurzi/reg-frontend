/** @jsxImportSource @emotion/react */

import { ReactNode } from 'react'
import Header from '../header'
import Footer from '../footer'

export interface CommonRegisterLayoutProps {
	readonly children: ReactNode
	readonly first?: boolean
	readonly onNext: () => void
}

const CommonRegisterLayout = ({ children, first = false, onNext }: CommonRegisterLayoutProps) => <>
	<Header showWelcome={first}/>
		{children}
	<Footer canBack={!first} onNext={onNext}/>
</>

export default CommonRegisterLayout
