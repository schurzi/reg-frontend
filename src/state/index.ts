import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import reducer from './reducers'
import epic from './epics'

export const configureStore = () => {
	// eslint-disable-next-line no-underscore-dangle
	const composeEnhancers = global.window && ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose

	const epicMiddleware = createEpicMiddleware()

	const store = createStore(
		reducer,
		composeEnhancers(
			applyMiddleware(epicMiddleware),
		),
	)

	epicMiddleware.run(epic)

	return store
}
