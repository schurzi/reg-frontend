/** @jsxImportSource @emotion/react */

import { Localized } from '@fluent/react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () =>
	<Layout>
		<SEO title="Home" />
		<Localized id="hello"><h1>Hello world!</h1></Localized>
	</Layout>

export default IndexPage
