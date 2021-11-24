/** @jsxImportSource @emotion/react */

import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { LanguageKey } from '../localization'

const SEO = ({ description = '', lang = 'en', meta = [], title }: { description?: string, lang?: LanguageKey, meta?: JSX.IntrinsicElements['meta'][], title: string }) => {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
			}
		`,
	)

	const metaDescription = description || site.siteMetadata.description
	const defaultTitle = site.siteMetadata?.title

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
			meta={([
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata?.author || ``,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
			] as JSX.IntrinsicElements['meta'][]).concat(meta)}
		/>
	)
}

export default SEO
