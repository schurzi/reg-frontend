import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { getCurrentError } from '~/state/selectors/errors'
import { ClearError } from '~/state/actions/errors'
import type { ReadonlyReactNode } from '~/util/readonly-types'
import FunnelErrorReport from '~/components/funnels/error-report'

export interface FunnelErrorGuardProps {
	readonly children: ReadonlyReactNode
}

const FunnelErrorGuard = ({ children }: FunnelErrorGuardProps) => {
	const dispatch = useAppDispatch()
	const currentError = useAppSelector(getCurrentError())

	return currentError === undefined
		? <>{children}</>
		: <FunnelErrorReport report={currentError} onBack={() => dispatch(ClearError.create(undefined))}/>
}

export default FunnelErrorGuard
