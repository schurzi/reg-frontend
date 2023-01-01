import { Localized } from '@fluent/react'
import ReactMarkdown from 'react-markdown'
import SplashFunnelLayout from '~/components/funnels/layout/splash'
import conCat from '~/images/con-cats/ticket-types/day.png'

const NotOpenYet = () => <SplashFunnelLayout image={conCat}>
	<Localized id="register-not-open-yet-title"><h1>Registration is not open yet!</h1></Localized>
	<Localized id="register-not-open-yet-content">
		<ReactMarkdown>
			We are not yet accepting registrations.
			Check back here when registration opens!
		</ReactMarkdown>
	</Localized>
</SplashFunnelLayout>

export default NotOpenYet
