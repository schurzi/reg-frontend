import { RouteComponentProps } from '@reach/router'
import { HotelBookingRouter } from '~/navigation/router'
import Layout from '~/components/layout'
import SEO from '~/components/seo'

const HotelBookingPage = (_: RouteComponentProps) => <Layout>
	<SEO title="Hotel Booking" />
	{HotelBookingRouter()}
</Layout>

export default HotelBookingPage
