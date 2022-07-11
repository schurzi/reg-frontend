import { graphql, useStaticQuery } from 'gatsby'

export interface SiteMetadata {
	readonly title: string
	readonly description: string
	readonly author: string
	readonly eventName: string
	readonly registrationLaunch: string
	readonly registrationExpirationDate: string
	readonly eventStartDate: string
	readonly eventEndDate: string
	readonly tshirtSizes: string[]
	readonly ticketLevels: {
		readonly id: string
		readonly price: number
	}[]
}

/*
 * Loads some config information.
 *
 * TODO: Coerce dates to the right types here, instead of in the components.
 */
export const useSiteMetadata = () => {
	const { site: { siteMetadata } } = useStaticQuery<{ site: { siteMetadata: SiteMetadata } }>(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					author
					eventName
					registrationLaunch
					registrationExpirationDate
					eventStartDate
					eventEndDate
					tshirtSizes
					ticketLevels {
						id
						price
					}
				}
			}
		}
	`)

	return siteMetadata
}
