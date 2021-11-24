import { Action } from 'redux'

export type AppAction<Type extends string, Payload> = Action<Type> & { payload: Payload }
export type AppActionCreator<Type extends string, Payload> = (payload: Payload) => AppAction<Type, Payload>
export type AppActionBundle<Type extends string, Payload> = {
	type: Type
	create: AppActionCreator<Type, Payload>
}
export type GetAction<T extends AppActionBundle<string, any>> = T extends AppActionBundle<string, infer Payload> ? AppAction<T['type'], Payload> : never

export const createAction = <Payload, Type extends string>(type: Type): AppActionBundle<Type, Payload> => ({
	type,
	create: (payload: Payload) => ({ type, payload }),
})
