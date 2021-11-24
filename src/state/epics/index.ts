import { combineEpics } from 'redux-observable'
import register from './register'

export default combineEpics(
	register,
)
