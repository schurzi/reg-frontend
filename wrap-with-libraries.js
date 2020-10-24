import React from 'react'
import { Provider } from 'react-redux'
import { StaticQuery } from 'gatsby'
import { configureStore } from './src/state'
import { loadConfig } from './src/state/actions/config'

export default ({ element }) => {
	const store = configureStore()

	return <Provider store={store}>
		{element}
	</Provider>

	// return <StaticQuery
	// 	query={graphql`
	// 		query Config {
	// 			site {
	// 				siteMetadata {
	// 					registrationLaunch
	// 				}
	// 			}
	// 		}
	// 	`}
	// 	render={data => {
	// 		const store = configureStore()

	// 		store.dispatch(loadConfig(data))

	// 		return <Provider store={store}>
	// 			{element}
	// 		</Provider>
	// 	}}
	// />
}
