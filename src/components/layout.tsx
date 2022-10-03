import { LocalizationProvider, ReactLocalization } from '@fluent/react'
import { useObservable, useObservableState } from 'observable-hooks'

import Header from './header'
import Footer from './footer'
import { Page } from '@eurofurence/reg-component-library'
import '@eurofurence/reg-component-library/dist/index.css'
import { loadLanguage, useCurrentLangKey } from '~/localization'
import { from } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import type { DeepReadonly } from 'ts-essentials'
import { ReadonlyDate } from '~/util/readonly-types'

export interface LayoutProps {
	readonly deadline?: ReadonlyDate
	readonly children: DeepReadonly<React.ReactNode>
}

const Layout = ({ deadline, children }: LayoutProps) => {
	const langKey = useCurrentLangKey()
	const localization$ = useObservable(langKey$ => langKey$.pipe(concatMap(([l]) => from(loadLanguage(l)))), [langKey])
	const localization = useObservableState(localization$, new ReactLocalization([]))

	return <LocalizationProvider l10n={localization}>
		<>
			<Header deadline={deadline}/>
			<Page>
				{children}
			</Page>
			<Footer/>
		</>
	</LocalizationProvider>
}

export default Layout
