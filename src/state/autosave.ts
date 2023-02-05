
import { load } from '~/util/local-storage'
import type { getSaveData } from './selectors/autosave'

export default load<ReturnType<ReturnType<typeof getSaveData>>>('redux-state')
