import { MarkupParser, ReactLocalization } from '@fluent/react'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { useLocation } from '@reach/router'
import { getCurrentLangKey } from 'ptz-i18n'
import { DATETIME_RANGE, NUMBER_RANGE } from 'fluent-ranges'

export const supportedLanguages = ['en', 'de'] as const

export type Locale = (typeof supportedLanguages)[number]

export const createLocalization = (locale: Locale, ftl: string, parseMarkup?: MarkupParser | null | undefined) => {
	const resource = new FluentResource(ftl)

	const bundle = new FluentBundle([locale], {
		functions: {
			DATETIME_RANGE,
			NUMBER_RANGE,
		},
	})

	bundle.addResource(resource)

	return new ReactLocalization([bundle], parseMarkup)
}

export const loadLanguage = async (locale: Locale): Promise<ReactLocalization> => {
	const { default: ftl } = await import(`raw-loader!~/localizations/${locale}.ftl`) as { default: string }

	return createLocalization(locale, ftl)
}

export const useCurrentLocale = () => {
	const location = useLocation()

	return getCurrentLangKey(supportedLanguages, 'en', location.pathname)
}
