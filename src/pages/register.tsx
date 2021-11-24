/** @jsxImportSource @emotion/react */

import { RegisterRouter } from '../navigation/router'
import Layout from '../components/layout'
import SEO from '../components/seo'

const RegisterPage = () => <Layout>
	<SEO title="Register" />
	{RegisterRouter()}
</Layout>

export default RegisterPage
