import { AppState } from '..'
import { FormIds } from '../forms'

export const getFormValues = <F extends FormIds>(id: F) => (s: AppState) => s.forms[id]
