import { MarkupParser, ReactLocalization } from '@fluent/react'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { useLocation } from '@reach/router'
import { getCurrentLangKey } from 'ptz-i18n'
import { DATETIME_RANGE, NUMBER_RANGE } from 'fluent-ranges'

export type LanguageKey = 'en' | 'de'

export const createLocalization = (langKey: LanguageKey, ftl: string, parseMarkup?: MarkupParser | null | undefined) => {
	const resource = new FluentResource(ftl)

	const bundle = new FluentBundle([langKey], {
		functions: {
			DATETIME_RANGE,
			NUMBER_RANGE,
		},
	})

	bundle.addResource(resource)

	return new ReactLocalization([bundle], parseMarkup)
}

export const loadLanguage = async (langKey: LanguageKey): Promise<ReactLocalization> => {
	const { default: ftl } = await import(`raw-loader!~/localizations/${langKey}.ftl`) as { default: string }

	return createLocalization(langKey, ftl)
}

export const useCurrentLangKey = () => {
	const location = useLocation()

	return getCurrentLangKey<LanguageKey>(['en', 'de'], 'en', location.pathname)
}
