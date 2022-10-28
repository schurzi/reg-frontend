import { Splash } from '@eurofurence/reg-component-library'
import { ReadonlyReactNode } from '~/util/readonly-types'

export interface SplashFunnelLayoutProps {
	readonly image: string
	readonly children: ReadonlyReactNode
}

const SplashFunnelLayout = ({ image, children }: SplashFunnelLayoutProps) => <Splash image={image}>
	{children}
</Splash>

export default SplashFunnelLayout
