import Header from './header'
import Footer from './footer'
import '@eurofurence/reg-component-library/dist/index.css'
import type { DeepReadonly } from 'ts-essentials'
import { ReadonlyDate } from '~/util/readonly-types'

export interface LayoutProps {
	readonly deadline?: ReadonlyDate
	readonly children: DeepReadonly<React.ReactNode>
}

const Layout = ({ deadline, children }: LayoutProps) => <>
	<Header deadline={deadline}/>
	{children}
	<Footer/>
</>

export default Layout
