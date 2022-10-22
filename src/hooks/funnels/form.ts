import { ReactLocalization, useLocalization } from '@fluent/react'
import { useEffect } from 'react'
import { useForm, FieldValues, RegisterOptions, FieldPath, FieldPathValue } from 'react-hook-form'
import { DeepReadonly } from 'ts-essentials'
import { mapObjIndexed } from 'ramda'
import { paramCase } from 'change-case'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { ChangeForm, SubmitForm } from '~/state/actions/forms'
import { FormIds, FormValuesType } from '~/state/forms'
import { getFormValues } from '~/state/selectors/forms'

type LocalizedValidate<TFieldValue> = (value: TFieldValue) => boolean | Promise<boolean>

type LocalizedRegisterOptions<TFieldValues extends FieldValues = FieldValues, TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> =
	Omit<RegisterOptions<TFieldValues, TFieldName>, 'required' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'validate'> & Partial<{
		required: boolean
		min: number | string
		max: number | string
		maxLength: number
		minLength: number
		pattern: RegExp
		validate: LocalizedValidate<FieldPathValue<TFieldValues, TFieldName>> | Record<string, LocalizedValidate<FieldPathValue<TFieldValues, TFieldName>>>
	}>

const localizeValidations = <TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
	l10n: DeepReadonly<ReactLocalization>,
	prefix: string,
	name: TFieldName,
	{ required, min, max, minLength, maxLength, pattern, validate, ...rest }: LocalizedRegisterOptions<TFieldValues, TFieldName> = {},
): RegisterOptions<TFieldValues, TFieldName> => {
	const getMessage = (rulename: string) =>
		l10n.getString(`${prefix}-validation-errors-${name.split('.').filter(x => Number.isNaN(Number(x))).join('-')}-${rulename}`)

	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
	const localizedValidate = <TFieldValue>(id: string, f: LocalizedValidate<TFieldValue>) => (value: TFieldValue) => f(value) || getMessage(id)
	const localizedRule = <TFieldValue>(id: string, value: TFieldValue) => ({ value, message: getMessage(id) })

	return {
		...required === undefined || !required ? { } : { required: getMessage('required') },
		...min === undefined ? { } : { min: localizedRule('min', min) },
		...max === undefined ? { } : { max: localizedRule('max', max) },
		...minLength === undefined ? { } : { minLength: localizedRule('min-length', minLength) },
		...maxLength === undefined ? { } : { maxLength: localizedRule('max-length', maxLength) },
		...pattern === undefined ? { } : { pattern: localizedRule('pattern', pattern) },
		...validate === undefined ? { } : validate instanceof Function
			? { validate: localizedValidate('validate', validate) }
			: { validate: mapObjIndexed((v, k) => localizedValidate(`validate-${paramCase(k)}`, v), validate) },
		...rest,
	}
}

/*
 * Wrapper around react-hook-form's `useForm` that dispatches page-specific `ChangeAction`s
 * when an input changes and `SubmitAction`s when the form is submitted to, so that this
 * boilerplate doesn't need to be repeated in every funnel page component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFunnelForm = <F extends FormIds>(id: F) => {
	const formValues = useAppSelector(getFormValues(id))
	const { watch, handleSubmit, register, ...methods } = useForm<FormValuesType<F>>({ defaultValues: formValues as never })
	const dispatch = useAppDispatch()
	const { l10n } = useLocalization()

	useEffect(() => {
		const subscription = watch(formData => dispatch(ChangeForm(id).create(formData as never)))

		return () => subscription.unsubscribe()
	})

	const newRegister = <
		TFieldName extends FieldPath<FormValuesType<F>> = FieldPath<FormValuesType<F>>
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	>(name: TFieldName, options?: LocalizedRegisterOptions<FormValuesType<F>, TFieldName>) =>
		register(name, localizeValidations(l10n, id, name, options))

	return {
		handleSubmit: handleSubmit(formData => dispatch(SubmitForm(id).create(formData as never))),
		watch,
		register: newRegister,
		...methods,
	}
}
