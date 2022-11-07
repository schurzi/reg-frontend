import { Localized } from '@fluent/react'
import { Controller } from 'react-hook-form'
import { Checkbox, FieldSet, TextField, RadioSet, RadioItem, Select, Form } from '@eurofurence/reg-component-library'
import WithInvoiceRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/with-invoice'
import langMap from 'langmap'
import { pluck } from 'ramda'
import { useFunnelForm } from '~/hooks/funnels/form'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'

const languageOptions = [...Object.entries(langMap)]
	.filter(([key]) => !key.includes('-'))
	.map(([value, names]) => ({ label: names.nativeName, value }))

// Don't understand why react-select makes me do this manually but ok
const languageOptionsByValue = new Map(languageOptions.map(l => [l.value, l]))

const Personal = (_: ReadonlyRouteComponentProps) => {
	const { register, handleSubmit, control, watch } = useFunnelForm('register-personal-info')

	const pronounsSelection = watch('pronounsSelection')

	return <WithInvoiceRegisterFunnelLayout onNext={handleSubmit} currentStep={2}>
		<Form onSubmit={handleSubmit}>
			<Localized id="register-personal-info-nickname" attrs={{ label: true, placeholder: true }}>
				<TextField
					label="Nickname"
					placeholder="Johnny_The_Sergal"
					{...register('nickname', {
						required: true,
						pattern: /^[\p{Letter}\p{Number}\p{Space_Separator}]+$/u,
						minLength: 1,
						maxLength: 80,
						validate: {
							noLeadingOrTrailingWhitespace: v => v!.trim() === v,
						},
					})}
				/>
			</Localized>
			<Localized id="register-personal-info-first-name" attrs={{ label: true, placeholder: true }}>
				<TextField label="First name" placeholder="John" gridSpan={5} {...register('firstName', { required: true })}/>
			</Localized>
			<Localized id="register-personal-info-last-name" attrs={{ label: true, placeholder: true }}>
				<TextField label="Last name" placeholder="Doe" gridSpan={5} {...register('lastName', { required: true })}/>
			</Localized>
			<Localized id="register-personal-info-full-name-permission" attrs={{ label: true }}>
				<Checkbox label="I grant permission to use my full name in Eurofurence related media." {...register('fullNamePermission')}/>
			</Localized>
			<Localized id="register-personal-info-name-on-badge" attrs={{ legend: true }}>
				<RadioSet name="nameOnBadge" legend="Name on badge">
					<Localized id="register-personal-info-name-on-badge-legal-name" attrs={{ label: true }}>
						<RadioItem label="Real name" value="legal-name" {...register('nameOnBadge', { required: true })}/>
					</Localized>
					<Localized id="register-personal-info-name-on-badge-nickname" attrs={{ label: true }}>
						<RadioItem label="Nickname" value="nickname" {...register('nameOnBadge', { required: true })}/>
					</Localized>
					<Localized id="register-personal-info-name-on-badge-legal-name-and-nickname" attrs={{ label: true }}>
						<RadioItem label="Real name + nickname" value="legal-name-and-nickname" {...register('nameOnBadge', { required: true })}/>
					</Localized>
				</RadioSet>
			</Localized>
			<Controller control={control} name="spokenLanguages" rules={{ required: true }} render={({ field: { onChange, value, ref, ...field } }) =>
				<Localized id="register-personal-info-spoken-languages" attrs={{ label: true }}>
					<Select
						label="Spoken languages"
						isMulti={true}
						options={languageOptions}
						onChange={langs => onChange(pluck('value', langs))}
						value={value.map(lang => languageOptionsByValue.get(lang)!)}
						{...field}
					/>
				</Localized>
			}/>
			<Localized id="register-personal-info-pronouns" attrs={{ legend: true }}>
				<RadioSet name="pronounsSelection" legend="Pronouns">
					<Localized id="register-personal-info-pronouns-he-him" attrs={{ label: true }}>
						<RadioItem label="He/Him" value="he-him" {...register('pronounsSelection', { required: true })}/>
					</Localized>
					<Localized id="register-personal-info-pronouns-she-her" attrs={{ label: true }}>
						<RadioItem label="She/Her" value="she-her" {...register('pronounsSelection', { required: true })}/>
					</Localized>
					<Localized id="register-personal-info-pronouns-they-them" attrs={{ label: true }}>
						<RadioItem label="They/Them" value="they-them" {...register('pronounsSelection', { required: true })}/>
					</Localized>
					<Localized id="register-personal-info-pronouns-other" attrs={{ label: true }}>
						<RadioItem label="Other:" value="other" {...register('pronounsSelection', { required: true })}>
							<Localized id="register-personal-info-pronouns-other-textfield" attrs={{ placeholder: true }}>
								<TextField placeholder="Xe/Xem" {...register('pronounsOther', { required: pronounsSelection === 'other' })}/>
							</Localized>
						</RadioItem>
					</Localized>
				</RadioSet>
			</Localized>
			<Localized id="register-personal-info-accessibility" attrs={{ legend: true }}>
				<FieldSet legend="Accessibility">
					<Localized id="register-personal-info-accessibility-wheelchair" attrs={{ label: true }}>
						<Checkbox label="Please accomodate my wheelchair (and me)." {...register('wheelchair')}/>
					</Localized>
				</FieldSet>
			</Localized>
		</Form>
	</WithInvoiceRegisterFunnelLayout>
}

export default Personal
