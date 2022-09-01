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
	readonly stagePassPrice: number
	readonly tshirtPrice: number
	readonly tshirtSizes: string[]
	readonly ticketLevels: {
		readonly id: string
		readonly prices: {
			readonly ticketType: 'full' | 'day'
			readonly price: number
		}[]
	}[]
	readonly rooms: {
		readonly id: string
		readonly price: number
		readonly image: string
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
					stagePassPrice
					tshirtPrice
					tshirtSizes
					ticketLevels {
						id
						prices {
							ticketType
							price
						}
					}
					rooms {
						id
						price
						image
					}
				}
			}
		}
	`)

	return siteMetadata
}
