import { createAction } from './create-action'

export const InitiateLogin = createAction<undefined, '[Auth] Initiate login'>('[Auth] Initiate login')

export type AuthAction
	= typeof InitiateLogin
