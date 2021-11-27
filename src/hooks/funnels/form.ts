import { useEffect } from 'react'
import { UnpackNestedValue, DeepPartial, useForm, FieldValues } from 'react-hook-form'
import { useAppDispatch } from '~/hooks/redux'
import { AnyAppAction } from '~/state/actions'
import { AppActionBundle } from '~/state/actions/create-action'

export const useFunnelForm = <
	T extends FieldValues,
>(ChangeAction: Extract<AnyAppAction, AppActionBundle<any, UnpackNestedValue<DeepPartial<T>>>>, SubmitAction: Extract<AnyAppAction, AppActionBundle<any, UnpackNestedValue<T>>>) => {
	const { watch, handleSubmit, ...methods } = useForm<T>()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const subscription = watch(data => dispatch(ChangeAction.create(data)))

		return () => subscription.unsubscribe()
	})

	return {
		handleSubmit: handleSubmit(data => dispatch(SubmitAction.create(data))),
		watch,
		...methods
	}
}
