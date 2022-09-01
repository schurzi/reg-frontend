const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    eventName: 'Eurofurence',
    registrationLaunch: '2022-01-21T12:30:23+02:00',
		registrationExpirationDate: '2022-01-31',
		eventStartDate: '2022-08-24',
		eventEndDate: '2022-08-28',
		stagePassPrice: 5,
		tshirtPrice: 20,
		tshirtSizes: ['S', 'M', 'L', 'XL', 'XXL'],
		ticketLevels: [
			{
				id: 'standard',
				prices: [
					{ ticketType: 'full', price: 90 },
					{ ticketType: 'day', price: 25 },
				]
			},
			{
				id: 'sponsor',
				prices: [
					{ ticketType: 'full', price: 155 },
					{ ticketType: 'day', price: 45 },
				]
			},
			{
				id: 'super-sponsor',
				prices: [
					{ ticketType: 'full', price: 250 },
					{ ticketType: 'day', price: 125 },
				]
			},
		],
		rooms: [
			{ id: 'standard', price: 140, image: 'standard_room.svg' },
			{ id: 'deluxe', price: 160, image: 'deluxe_room.svg' },
			{ id: 'junior-suite', price: 198, image: 'junior_suite.svg' },
			{ id: 'deluxe-suite', price: 228, image: 'suite_deluxe.svg' },
		],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // { // TODO: Enable again after we have an icon.
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en',
        useLangKeyLayout: false
      }
    },
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          // Have to do this because we are using a component library and
          // there is an annoying interaction between peer depencies and `npm link`.
          // See: https://medium.com/@penx/managing-dependencies-in-a-node-package-so-that-they-are-compatible-with-npm-link-61befa5aaca7
          'react': path.resolve('./node_modules/react'),
          'react-dom': path.resolve('./node_modules/react-dom')
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
