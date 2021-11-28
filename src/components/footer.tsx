import styled from '@emotion/styled'
import { Localized } from '@fluent/react'
import { Footer as CLFooter } from '@eurofurence/reg-component-library'
import { useAppSelector } from '../hooks/redux'
import { getLastSaved } from '../state/selectors/autosave'

const Links = styled.nav`
	display: flex;
	gap: 2em;
`

const Grid = styled.div`
	display: flex;
	justify-content: space-between;
`

const Footer = () => {
	const lastSaved = useAppSelector(getLastSaved())

	return <CLFooter>
		<Grid>
			<Links>
				<Localized id="footer-links-privacy-policy"><a>Privacy policy</a></Localized>
				<Localized id="footer-links-cookie-statement"><a>Cookie statement</a></Localized>
				<Localized id="footer-links-contact"><a>Contact Eurofurence</a></Localized>
			</Links>
			<section>
				{lastSaved === undefined ? undefined : <Localized id="footer-last-saved" vars={{ lastSaved: lastSaved.toJSDate() }}>
					<p>Your information was last saved on {lastSaved.toString()}.</p>
				</Localized>}
			</section>
		</Grid>
	</CLFooter>
}

export default Footer
