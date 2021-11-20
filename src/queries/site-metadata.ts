import { graphql, useStaticQuery } from 'gatsby'

export interface SiteMetadata {
	readonly title: string
	readonly description: string
	readonly author: string
	readonly eventName: string
	readonly registrationLaunch: string
	readonly eventStartDate: string
	readonly eventEndDate: string
	readonly ticketLevels: {
		readonly id: string
		readonly price: number
	}[]
}

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
					eventStartDate
					eventEndDate
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
