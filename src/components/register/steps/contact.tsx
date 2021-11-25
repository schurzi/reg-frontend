/** @jsxImportSource @emotion/react */

import { Localized } from '@fluent/react'
import { RouteComponentProps } from '@reach/router'
import { useForm } from 'react-hook-form'
import { TextField } from '@eurofurence/reg-component-library'
import WithInvoiceRegisterLayout from '../layout/with-invoice'
import { SubmitContactInfo } from '../../../state/actions/register'
import { ContactInfo } from '../../../state/models/register'
import { useAppDispatch } from '../../../hooks/redux'

const Contact = (_: RouteComponentProps) => {
	const { register, handleSubmit } = useForm<ContactInfo>()
	const dispatch = useAppDispatch()

	return <WithInvoiceRegisterLayout onSubmit={handleSubmit(data => dispatch(SubmitContactInfo.create(data)))}>
		<Localized id="register-form-email" attrs={{ label: true, placeholder: true }}>
			<TextField label="Email address" placeholder="john.smith@email.com" gridSpan={7} {...register('email')}/>
		</Localized>
		<Localized id="register-form-phone-number" attrs={{ label: true, placeholder: true }}>
			<TextField label="Phone number" placeholder="+32 0 000 00 00" gridSpan={3} {...register('phoneNumber')}/>
		</Localized>
		<Localized id="register-form-street" attrs={{ label: true, placeholder: true }}>
			<TextField label="Street" placeholder="Pennylane 40" {...register('street')}/>
		</Localized>
		<Localized id="register-form-city" attrs={{ label: true, placeholder: true }}>
			<TextField label="City" placeholder="Zootopia" gridSpan={7} {...register('city')}/>
		</Localized>
		<Localized id="register-form-postal-code" attrs={{ label: true, placeholder: true }}>
			<TextField label="Postal code (ZIP)" placeholder="8888" gridSpan={3} {...register('postalCode')}/>
		</Localized>
		<Localized id="register-form-state-or-province" attrs={{ label: true, placeholder: true }}>
			<TextField label="State / Province" placeholder="Fur Valley" gridSpan={5} {...register('stateOrProvince')}/>
		</Localized>
		<Localized id="register-form-country" attrs={{ label: true, placeholder: true }}>
			<TextField label="Country" placeholder="Germany" gridSpan={5} {...register('country')}/>
		</Localized>
	</WithInvoiceRegisterLayout>
}

export default Contact
