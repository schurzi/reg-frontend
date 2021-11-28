/** @jsxImportSource @emotion/react */

import { Localized } from '@fluent/react'
import { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useForm } from 'react-hook-form'
import { Checkbox, FieldSet, TextField, RadioSet, RadioItem, Select } from '@eurofurence/reg-component-library'
import WithInvoiceRegisterLayout from '~/components/register/layout/with-invoice'
import { PersonalInfo } from '~/state/models/register'
import langMap from 'langmap'
import { ChangePersonalInfo, SubmitPersonalInfo } from '~/state/actions/register'
import { useAppDispatch } from '~/hooks/redux'

const languageOptions = [...Object.entries(langMap)]
	.filter(([key]) => !key.includes('-'))
	.map(([value, names]) => ({ label: names.nativeName, value }))


const Personal = (_: RouteComponentProps) => {
	const { register, watch, handleSubmit } = useForm<PersonalInfo>()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const subscription = watch(data => dispatch(ChangePersonalInfo.create(data)))

		return () => subscription.unsubscribe()
	})

	return <WithInvoiceRegisterLayout onSubmit={handleSubmit(data => dispatch(SubmitPersonalInfo.create(data)))}>
		<Localized id="register-form-nickname" attrs={{ label: true, placeholder: true }}>
			<TextField label="Nickname" placeholder="Johnny_The_Sergal" {...register('nickname')}/>
		</Localized>
		<Localized id="register-form-first-name" attrs={{ label: true, placeholder: true }}>
			<TextField label="First name" placeholder="John" gridSpan={5} {...register('firstName')}/>
		</Localized>
		<Localized id="register-form-last-name" attrs={{ label: true, placeholder: true }}>
			<TextField label="Last name" placeholder="Doe" gridSpan={5} {...register('lastName')}/>
		</Localized>
		<Localized id="register-form-full-name-permission" attrs={{ label: true }}>
			<Checkbox label="I grant permission to use my full name in Eurofurence related media." {...register('fullNamePermission')}/>
		</Localized>
		<Localized id="register-form-name-on-badge" attrs={{ legend: true }}>
			<RadioSet name="nameOnBadge" legend="Name on badge">
				<Localized id="register-form-name-on-badge-real-name" attrs={{ label: true }}>
					<RadioItem label="Real name" value="real-name" {...register('nameOnBadge')}/>
				</Localized>
				<Localized id="register-form-name-on-badge-nickname" attrs={{ label: true }}>
					<RadioItem label="Nickname" value="nickname" {...register('nameOnBadge')}/>
				</Localized>
				<Localized id="register-form-name-on-badge-real-name-and-nickname" attrs={{ label: true }}>
					<RadioItem label="Real name + nickname" value="real-name-and-nickname" {...register('nameOnBadge')}/>
				</Localized>
			</RadioSet>
		</Localized>
		<Localized id="register-form-spoken-languages" attrs={{ label: true }}>
			<Select name="spoken-languages" label="Spoken languages" isMulti options={languageOptions}/>
		</Localized>
		<Localized id="register-form-gender" attrs={{ legend: true }}>
			<RadioSet name="gender" legend="Gender">
				<Localized id="register-form-gender-male" attrs={{ label: true }}>
					<RadioItem label="Male" value="male" {...register('gender')}/>
				</Localized>
				<Localized id="register-form-gender-female" attrs={{ label: true }}>
					<RadioItem label="Female" value="female" {...register('gender')}/>
				</Localized>
				<Localized id="register-form-gender-non-binary" attrs={{ label: true }}>
					<RadioItem label="Non-binary" value="non-binary" {...register('gender')}/>
				</Localized>
				<Localized id="register-form-gender-prefer-not-to-say" attrs={{ label: true }}>
					<RadioItem label="I prefer not to say" value="prefer-not-to-say" defaultChecked {...register('gender')}/>
				</Localized>
			</RadioSet>
		</Localized>
		<Localized id="register-form-accessibility" attrs={{ legend: true }}>
			<FieldSet legend="Accessibility">
				<Localized id="register-form-accessibility-wheelchair" attrs={{ label: true }}>
					<Checkbox label="Please accomodate my wheelchair (and me)." {...register('wheelchair')}/>
				</Localized>
			</FieldSet>
		</Localized>
	</WithInvoiceRegisterLayout>
}

export default Personal
