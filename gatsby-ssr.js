import { LocalizationProvider, ReactLocalization } from '@fluent/react'
import { load } from 'cheerio'
import { getCurrentLangKey } from 'ptz-i18n'
import { createLocalization, useCurrentLangKey } from '~/localization'
import * as localizationFiles from '~/localizations'
import wrapWithLibraries from './wrap-with-libraries'

const parseMarkup = (str) => {
	const $ = load(str)

	return $
		.root()
		.children()
		.toArray()
		.map(child => ({
			nodeName: child.tagName,
			textContent: $(child).text(),
		}))
}

const localizations = Object.fromEntries(Object.entries(localizationFiles).map(([langKey, ftl]) => [langKey, createLocalization(langKey, ftl, parseMarkup)]))

const PageWrapper = ({ children }) => {
	const langKey = useCurrentLangKey()

	return <LocalizationProvider l10n={localizations[langKey]}>
		{children}
	</LocalizationProvider>
}

export const onRenderBody = ({ pathname, setHtmlAttributes }) => {
	setHtmlAttributes({ lang: getCurrentLangKey(['en', 'de'], 'en', pathname) })
}

export const wrapPageElement = ({ element }) => <PageWrapper>
	{element}
</PageWrapper>

export const wrapRootElement = wrapWithLibraries
