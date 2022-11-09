import { RegisterRouter } from '~/navigation/router'
import Layout from '~/components/layout'
import SEO from '~/components/seo'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'

export const Head = () => <SEO title="Register" />

const RegisterPage = (_: ReadonlyRouteComponentProps) => <Layout>
	{RegisterRouter()}
</Layout>

export default RegisterPage
