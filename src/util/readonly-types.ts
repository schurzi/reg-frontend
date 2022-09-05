import type { ReactNode } from 'react'
import type { DeepReadonly } from 'ts-essentials'
import type { DeepReadonly as DeepReadonlyForDate } from 'utility-types' // ts-essentials is more powerful but intentionally skips Date objects
import type { RouteComponentProps } from '@reach/router'

export type ReadonlyReactNode = DeepReadonly<ReactNode>
export type ReadonlyRouteComponentProps = DeepReadonly<RouteComponentProps>
export type ReadonlyDate = DeepReadonlyForDate<Date>
