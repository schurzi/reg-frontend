import { ComponentType } from 'react'
import { Router } from '@reach/router'
import { ReadonlyRouteComponentProps } from '~/util/readonly-types'

const FunnelContext = createContext({ stepCount: 0 })
const FunnelStepContext = createContext({ stepIndex: 0, isSubstep: false, isEditMode: false })

type FunnelStepProps = ReadonlyRouteComponentProps & {
	readonly Component: ComponentType
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const FunnelStep = ({ Component }: FunnelStepProps) => <>
	<Component/>
</>

export interface FunnelProps {
	steps: {
		Component: ComponentType
		path: string
		default: boolean
		subSteps?: {
			Component: ComponentType
			path: string
		}[]
	}[]
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const Funnel = ({ steps }: FunnelProps) => <Router>
	{steps.flatMap(({ Component, path, default: default_, subSteps = [] }) => [
		<FunnelStep Component={Component} key={path} path={path} default={default_}/>,
		...subSteps.map(({ Component, path }) =>
			<FunnelStep Component={Component} key={path} path={path}/>,
		),
	])}
</Router>

export default Funnel
