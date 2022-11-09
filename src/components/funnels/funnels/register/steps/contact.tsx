import { Localized } from '@fluent/react'
import { Form, TextField } from '@eurofurence/reg-component-library'
import WithInvoiceRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/with-invoice'
import { useFunnelForm } from '~/hooks/funnels/form'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'

const reEmail = /^[^@\p{Space_Separator}]+@[^@\p{Space_Separator}]+$/u

const Contact = (_: ReadonlyRouteComponentProps) => {
	const { register, handleSubmit } = useFunnelForm('register-contact-info')

	return <WithInvoiceRegisterFunnelLayout onNext={handleSubmit} currentStep={3}>
		<Form onSubmit={handleSubmit}>
			<Localized id="register-contact-info-email" attrs={{ label: true, placeholder: true }}>
				<TextField label="Email address" placeholder="john.smith@email.com" gridSpan={7} {...register('email', { required: true, maxLength: 200, pattern: reEmail })}/>
			</Localized>
			<Localized id="register-contact-info-phone-number" attrs={{ label: true, placeholder: true }}>
				<TextField label="Phone number" placeholder="+32 0 000 00 00" gridSpan={3} {...register('phoneNumber', { required: true, maxLength: 32 })}/>
			</Localized>
			<Localized id="register-contact-info-street" attrs={{ label: true, placeholder: true }}>
				<TextField label="Street" placeholder="Pennylane 40" {...register('street', { required: true, maxLength: 120 })}/>
			</Localized>
			<Localized id="register-contact-info-city" attrs={{ label: true, placeholder: true }}>
				<TextField label="City" placeholder="Zootopia" gridSpan={7} {...register('city', { required: true, maxLength: 80 })}/>
			</Localized>
			<Localized id="register-contact-info-postal-code" attrs={{ label: true, placeholder: true }}>
				<TextField label="Postal code (ZIP)" placeholder="8888" gridSpan={3} {...register('postalCode', { required: true, maxLength: 20 })}/>
			</Localized>
			<Localized id="register-contact-info-state-or-province" attrs={{ label: true, placeholder: true }}>
				<TextField label="State / Province" placeholder="Fur Valley" gridSpan={5} {...register('stateOrProvince', { required: true, maxLength: 80 })}/>
			</Localized>
			<Localized id="register-contact-info-country" attrs={{ label: true, placeholder: true }}>
				<TextField label="Country" placeholder="Germany" gridSpan={5} {...register('country', { required: true })}/>
			</Localized>
		</Form>
	</WithInvoiceRegisterFunnelLayout>
}

export default Contact
