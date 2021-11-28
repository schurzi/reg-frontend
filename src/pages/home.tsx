import { Localized } from '@fluent/react'
import { RouteComponentProps } from '@reach/router'
import Layout from '~/components/layout'
import SEO from '~/components/seo'

export const IndexPage = (_: RouteComponentProps) => (
	<Layout>
		<SEO title="Home" />
		<Localized id="hello">
			<h1>Hello world!</h1>
		</Localized>
	</Layout>
)
