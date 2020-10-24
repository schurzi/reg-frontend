import { ReactLocalization } from '@fluent/react'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import axios from 'axios'

export type LanguageKey = 'en' | 'de'

export const loadLanguage = async (langKey: LanguageKey): Promise<ReactLocalization> => {
	const { data: ftl } = await axios.get(`/localizations/${langKey}.ftl`)

	const resource = new FluentResource(ftl)

	console.log('loading lang', langKey, 'resource', resource)

	const bundle = new FluentBundle([langKey])

	bundle.addResource(resource)

	return new ReactLocalization([bundle])
}
