import { AnyAppAction, GetAction } from '~/state/actions'
import { FormIds, forms, FormValuesType } from '../forms'
import { ChangeForm } from '../actions/forms'
import { combineReducers, Reducer } from 'redux'
import autosaveData from '~/state/autosave'

const formStateReducer = <F extends FormIds>(id: F) => (state = autosaveData?.forms[id] ?? forms[id].defaultValues, action: GetAction<AnyAppAction>) => {
	switch (action.type) {
		case ChangeForm(id).type:
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export type FormsState = {
	readonly [F in FormIds]: FormValuesType<F>
}

type FormsStateReducerMap = {
	readonly [F in FormIds]: Reducer<FormValuesType<F>, GetAction<AnyAppAction>>
}

export default combineReducers<FormsStateReducerMap>(Object.fromEntries(Object.keys(forms).map(id => [id, formStateReducer(id as FormIds)])) as FormsStateReducerMap)
