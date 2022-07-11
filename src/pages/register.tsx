import { RouteComponentProps } from '@reach/router'
import { RegisterRouter } from '~/navigation/router'
import Layout from '~/components/layout'
import SEO from '~/components/seo'

const RegisterPage = (_: Readonly<RouteComponentProps>) => <Layout>
	<SEO title="Register" />
	{RegisterRouter()}
</Layout>

export default RegisterPage
