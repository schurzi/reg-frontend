/** @jsxImportSource @emotion/react */

import { LocalizationProvider, ReactLocalization } from '@fluent/react'
import { useLocation } from '@reach/router'
import { getCurrentLangKey } from 'ptz-i18n'
import { useObservable, useObservableState } from 'observable-hooks'

import Header from './header'
import '@eurofurence/reg-component-library/dist/index.css'
import { LanguageKey, loadLanguage } from '../localization'
import { from } from 'rxjs'
import { concatMap } from 'rxjs/operators'

const Layout = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation()
	const langKey = getCurrentLangKey<LanguageKey>(['en', 'de'], 'en', location.pathname)
	const localization$ = useObservable(langKey$ => langKey$.pipe(concatMap(([l]) => from(loadLanguage(l)))), [langKey])
	const localization = useObservableState(localization$, new ReactLocalization([]))

	return <LocalizationProvider l10n={localization}>
		<>
			<Header />
			<main>{children}</main>
		</>
	</LocalizationProvider>
}

export default Layout
