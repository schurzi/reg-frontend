import { Localized } from '@fluent/react'
import { Controller } from 'react-hook-form'
import { Checkbox, FieldSet, TextField, RadioSet, RadioItem, Select, Form } from '@eurofurence/reg-component-library'
import WithInvoiceRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/with-invoice'
import langMap from 'langmap'
import { pluck } from 'ramda'
import { useFunnelForm } from '~/hooks/funnels/form'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import { sub } from 'date-fns'
import config from '~/config'

const languageOptions = [...Object.entries(langMap)]
	.filter(([key]) => !key.includes('-'))
	.map(([value, names]) => ({ label: names.nativeName, value }))

// Don't understand why react-select makes me do this manually but ok
const languageOptionsByValue = new Map(languageOptions.map(l => [l.value, l]))

const reAlphaNum = /[\p{Letter}\p{Number}]/ug
const alphaNumCount = (s: string) => s.match(reAlphaNum)?.length ?? 0

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
						maxLength: 80,
						validate: {
							noLeadingOrTrailingWhitespace: v => v!.trim() === v,
							minOneAlphanumericChar: v => alphaNumCount(v!) > 0,
							maxTwoNonAlphanumericChars: v => v!.length - alphaNumCount(v!) <= 2,
						},
					})}
				/>
			</Localized>
			<Localized id="register-personal-info-first-name" attrs={{ label: true, placeholder: true }}>
				<TextField label="First name" placeholder="John" gridSpan={5} {...register('firstName', { required: true, maxLength: 80 })}/>
			</Localized>
			<Localized id="register-personal-info-last-name" attrs={{ label: true, placeholder: true }}>
				<TextField label="Last name" placeholder="Doe" gridSpan={5} {...register('lastName', { required: true, maxLength: 80 })}/>
			</Localized>
			<Localized id="register-personal-info-full-name-permission" attrs={{ label: true }}>
				<Checkbox label="I grant permission to use my full name in Eurofurence related media." {...register('fullNamePermission')}/>
			</Localized>
			<Localized id="register-personal-info-date-of-birth" attrs={{ label: true }}>
				<TextField label="Date of birth" placeholder="1995-06-30" type="date" {...register('dateOfBirth', {
					required: true,
					validate: {
						minimumAge: v => new Date(v!) <= sub(config.eventStartDate, { years: config.minimumAge }),
						maximumAge: v => new Date(v!) >= config.earliestBirthDate,
					},
				})}/>
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
					<RadioItem label="He/Him" value="He/Him" {...register('pronounsSelection', { required: true })}/>
					<RadioItem label="She/Her" value="She/Her" {...register('pronounsSelection', { required: true })}/>
					<RadioItem label="They/Them" value="They/Them" {...register('pronounsSelection', { required: true })}/>
					<RadioItem label="Other:" value="other" {...register('pronounsSelection', { required: true })}>
						<TextField placeholder="Xe/Xem" {...register('pronounsOther', { required: pronounsSelection === 'other' })}/>
					</RadioItem>
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
