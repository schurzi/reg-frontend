import { AppState } from '~/state'
import { SaveData } from '~/state/models/autosave'

import { getUserInfo } from './auth'
import { getRegistrationInfo } from './register'

export const getLastSaved = () => (s: AppState) => s.autosave.lastSaved
export const getSaveData = () => (s: AppState): SaveData => ({
	userInfo: getUserInfo()(s),
	registrationInfo: getRegistrationInfo()(s),
})
