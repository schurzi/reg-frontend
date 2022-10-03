import { ReactLocalization, useLocalization } from '@fluent/react'
import { useEffect } from 'react'
import { DeepPartial, useForm, FieldValues, RegisterOptions, FieldPath, FieldPathValue } from 'react-hook-form'
import { DeepReadonly } from 'ts-essentials'
import { mapObjIndexed } from 'ramda'
import { paramCase } from 'change-case'
import { useAppDispatch } from '~/hooks/redux'
import { AnyAppAction } from '~/state/actions'
import { AppActionBundle } from '~/state/actions/create-action'

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
export const useFunnelForm = <
	T extends FieldValues,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
>(l10nPrefix: string, ChangeAction: Extract<AnyAppAction, AppActionBundle<any, DeepPartial<T>>>, SubmitAction: Extract<AnyAppAction, AppActionBundle<any, T>>) => {
	const { watch, handleSubmit, register, ...methods } = useForm<T>()
	const dispatch = useAppDispatch()
	const { l10n } = useLocalization()

	useEffect(() => {
		const subscription = watch(formData => dispatch(ChangeAction.create(formData)))

		return () => subscription.unsubscribe()
	})

	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	const newRegister = <TFieldName extends FieldPath<T> = FieldPath<T>>(name: TFieldName, options?: LocalizedRegisterOptions<T, TFieldName>) =>
		register(name, localizeValidations(l10n, l10nPrefix, name, options))

	return {
		handleSubmit: handleSubmit(formData => dispatch(SubmitAction.create(formData))),
		watch,
		register: newRegister,
		...methods,
	}
}
