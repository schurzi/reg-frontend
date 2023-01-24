import { withPrefix } from 'gatsby'
import { createContext, FC, useContext } from 'react'
import { Redirect } from '@reach/router'
import { useAppSelector } from '~/hooks/redux'
import { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import { Selector } from 'react-redux'
import { AppState } from '~/state'

const FunnelStepContext = createContext({ current: 0, total: 0, isSubstep: false, isEditMode: false })

export interface FunnelDef<T extends string[]> {
	paths: T
	getNextStep: (step: number) => Selector<AppState, number | undefined>
	isEditMode: () => Selector<AppState, boolean>
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createFunnelStep = <T extends string[]>(funnelDef: FunnelDef<T>) => (step: number, isSubstep: boolean = false) => (ChildComponent: FC) => (_: ReadonlyRouteComponentProps) => {
	const nextStep = useAppSelector(funnelDef.getNextStep(step))
	const isEditMode = useAppSelector(funnelDef.isEditMode())

	return nextStep !== undefined && step > nextStep
		? <Redirect to={withPrefix(funnelDef.paths[nextStep])}/>
		: <FunnelStepContext.Provider value={{ current: step, total: funnelDef.paths.length, isSubstep, isEditMode }}>
			<ChildComponent/>
		</FunnelStepContext.Provider>
}

export const useFunnelStep = () => useContext(FunnelStepContext)
