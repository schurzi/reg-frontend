declare module 'ptz-i18n' {
	export function getCurrentLangKey<K>(languages: K[], defaultLanguage: K, url: string): K
}
