import wrapWithLibraries from './wrap-with-libraries'

export const onRenderBody = ({ setHtmlAttributes }) => {
	setHtmlAttributes({ lang: "en" })
}

export const wrapRootElement = wrapWithLibraries
