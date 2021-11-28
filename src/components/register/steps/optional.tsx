/** @jsxImportSource @emotion/react */

import { Localized } from '@fluent/react'
import { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useForm } from 'react-hook-form'
import { Checkbox, FieldSet, TextArea } from '@eurofurence/reg-component-library'
import WithInvoiceRegisterLayout from '~/components/register/layout/with-invoice'
import { OptionalInfo } from '~/state/models/register'
import { ChangeOptionalInfo, SubmitOptionalInfo } from '~/state/actions/register'
import { useAppDispatch } from '~/hooks/redux'

const Optional = (_: RouteComponentProps) => {
	const { register, watch, handleSubmit } = useForm<OptionalInfo>()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const subscription = watch(data => dispatch(ChangeOptionalInfo.create(data)))

		return () => subscription.unsubscribe()
	})

	return <WithInvoiceRegisterLayout onSubmit={handleSubmit(data => dispatch(SubmitOptionalInfo.create(data)))}>
		<Localized id="register-form-notifications" attrs={{ legend: true }}>
			<FieldSet legend="I would like to receive event information and announcements about">
				<Localized id="register-form-notifications-art" attrs={{ label: true }}>
					<Checkbox label="Art" {...register('notifications.art')}/>
				</Localized>
				<Localized id="register-form-accessibility-animation" attrs={{ label: true }}>
					<Checkbox label="Animation" {...register('notifications.animation')}/>
				</Localized>
				<Localized id="register-form-accessibility-music" attrs={{ label: true }}>
					<Checkbox label="Music" {...register('notifications.music')}/>
				</Localized>
				<Localized id="register-form-accessibility-fursuiting" attrs={{ label: true }}>
					<Checkbox label="Fursuiting" {...register('notifications.fursuiting')}/>
				</Localized>
			</FieldSet>
		</Localized>
		<Localized id="register-form-comments" attrs={{ label: true, placeholder: true }}>
			<TextArea label="Comments" placeholder={'I would like to know more about ...'} {...register('comments')}/>
		</Localized>
	</WithInvoiceRegisterLayout>
}

export default Optional
