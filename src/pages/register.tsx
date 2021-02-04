/** @jsxImportSource @emotion/react */

import { Localized } from '@fluent/react'
import { useForm } from 'react-hook-form'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Form, TextField, Checkbox, RadioSet, RadioItem, FieldSet, Page, Paper, WizardProgressBar } from '@eurofurence/reg-component-library'

const IndexPage = () => {
	const { register } = useForm()

	return <Layout>
		<SEO title="Register" />
		<Page>
			<Localized id="register-header-title"><h1>Welcome to Eurofurence 2022!</h1></Localized>
			<Localized id="register-header-description">
				<p>
					We&apos;re very excited that you&apos;ve decided to join us for this confurence.
					Get ready for a fun couple of days with likeminded people and enjoy all the activities and events that we&apos;ve got lined up for you this year.
				</p>
			</Localized>
			<WizardProgressBar steps={['Order', 'Personal information', 'Contact information', 'Optional information', 'Checkout']} currentStep={1}/>
			<Paper>
				<Form>
					<Localized id="register-form-nickname" attrs={{ label: true, placeholder: true }}>
						<TextField name="nickname" label="Nickname" placeholder="Johnny_The_Sergal" ref={register}/>
					</Localized>
					<Localized id="register-form-first-name" attrs={{ label: true, placeholder: true }}>
						<TextField name="firstName" label="First name" placeholder="John" gridSpan={5} ref={register}/>
					</Localized>
					<Localized id="register-form-last-name" attrs={{ label: true, placeholder: true }}>
						<TextField name="lastName" label="Last name" placeholder="Doe" gridSpan={5} ref={register}/>
					</Localized>
					<Localized id="register-form-full-name-permission" attrs={{ label: true }}>
						<Checkbox name="fullNamePermission" label="I grant permission to use my full name in Eurofurence related media." ref={register}/>
					</Localized>
					<Localized id="register-form-name-on-badge" attrs={{ legend: true }}>
						<RadioSet name="nameOnBadge" legend="Name on badge">
							<Localized id="register-form-name-on-badge-real-name" attrs={{ label: true }}>
								<RadioItem label="Real name" value="real-name" ref={register}/>
							</Localized>
							<Localized id="register-form-name-on-badge-nickname" attrs={{ label: true }}>
								<RadioItem label="Nickname" value="nickname" ref={register}/>
							</Localized>
							<Localized id="register-form-name-on-badge-real-name-and-nickname" attrs={{ label: true }}>
								<RadioItem label="Real name + nickname" value="real-name-and-nickname" ref={register}/>
							</Localized>
						</RadioSet>
					</Localized>
					{/* TODO: Spoken languages */}
					<Localized id="register-form-gender" attrs={{ legend: true }}>
						<RadioSet name="gender" legend="Gender">
							<Localized id="register-form-gender-male" attrs={{ label: true }}>
								<RadioItem label="Male" value="male" ref={register}/>
							</Localized>
							<Localized id="register-form-gender-female" attrs={{ label: true }}>
								<RadioItem label="Female" value="female" ref={register}/>
							</Localized>
							<Localized id="register-form-gender-non-binary" attrs={{ label: true }}>
								<RadioItem label="Non-binary" value="non-binary" ref={register}/>
							</Localized>
							<Localized id="register-form-gender-prefer-not-to-say" attrs={{ label: true }}>
								<RadioItem label="I prefer not to say" value="prefer-not-to-say" defaultChecked ref={register}/>
							</Localized>
						</RadioSet>
					</Localized>
					<Localized id="register-form-accessibility" attrs={{ legend: true }}>
						<FieldSet legend="Accessibility">
							<Localized id="register-form-accessibility-wheelchair" attrs={{ label: true }}>
								<Checkbox name="wheelchair" label="Please accomodate my wheelchair (and me)." ref={register}/>
							</Localized>
						</FieldSet>
					</Localized>
				</Form>
			</Paper>
		</Page>
	</Layout>
}

export default IndexPage
