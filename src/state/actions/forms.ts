import type { DeepPartial } from 'ts-essentials'
import { FormIds, FormValuesType } from '~/state/forms'
import { AppActionBundle, createAction } from './create-action'

export type ChangeFormActionBundle<F extends FormIds> = F extends FormIds ? AppActionBundle<`[Form] Change form ${F}`, DeepPartial<FormValuesType<F>>> : never
export type SubmitFormActionBundle<F extends FormIds> = F extends FormIds ? AppActionBundle<`[Form] Submit form ${F}`, FormValuesType<F>> : never

export const ChangeForm = <F extends FormIds>(f: F): ChangeFormActionBundle<F> =>
	createAction<DeepPartial<FormValuesType<F>>, `[Form] Change form ${F}`>(`[Form] Change form ${f}`) as never

export const SubmitForm = <F extends FormIds>(f: F): SubmitFormActionBundle<F> =>
	createAction<FormValuesType<F>, `[Form] Submit form ${F}`>(`[Form] Submit form ${f}`) as never

type FormActions<F extends FormIds> =
	| ChangeFormActionBundle<F>
	| SubmitFormActionBundle<F>

export type FormAction = FormActions<FormIds>
