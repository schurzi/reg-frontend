import { Localized, useLocalization } from '@fluent/react'
import WithInvoiceRegisterFunnelLayout from '~/components/funnels/funnels/register/layout/form/with-invoice'
import type { ReadonlyRouteComponentProps } from '~/util/readonly-types'
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { getContactInfo, getOptionalInfo, getPersonalInfo, isEditMode } from '~/state/selectors/register'
import langmap from 'langmap'
import { Link } from 'gatsby'
import { css } from '@emotion/react'
import { SubmitRegistration } from '~/state/actions/register'
import { useCurrentLangKey } from '~/localization'

interface PropertyDefinition {
	readonly id: string
	readonly value: string
	readonly wide?: boolean
}

interface SectionProps {
	readonly id: string
	readonly editLink: string
	readonly properties: readonly PropertyDefinition[]
}

const SectionContainer = styled.section`
	display: grid;
	grid: "title title" auto
	      "edit  props" auto
	      / 273px auto;

	&:not(:last-of-type) {
		border-bottom: 1px solid var(--color-grays-200);
		padding-bottom: 2em;
	}

	&:not(:first-of-type) {
		padding-top: 2em;
	}
`

const SectionTitle = styled.h4`
	grid-area: title;
`

const editButtonStyle = css`
	grid-area: edit;
`

const PropertyList = styled.dl`
	grid-area: props;

	display: grid;
	grid: auto / repeat(2, 1fr);
	grid-row-gap: 2em;
`

const Property = styled.div<{ readonly wide: boolean }>`
	grid-column: span ${({ wide }) => wide ? 2 : 1};
`

const PropertyName = styled.dt`
	font-family: Inter;
	font-weight: 400;
	font-size: 12px;

	color: var(--color-brand-2-500);
`

const PropertyDescription = styled.dd`
`

const Section = ({ id: sectionId, editLink, properties }: SectionProps) => <SectionContainer>
	<Localized id={`register-summary-section-${sectionId}-title`}><SectionTitle>{sectionId}</SectionTitle></Localized>
	<Localized id="register-summary-edit"><Link css={editButtonStyle} to={editLink}>Edit information</Link></Localized>
	<PropertyList>
		{properties.map(({ id, value, wide = false }) => <Property key={id} wide={wide}>
			<Localized id={`register-summary-section-${sectionId}-property-${id}-name`}><PropertyName>{id}</PropertyName></Localized>
			<PropertyDescription>{value}</PropertyDescription>
		</Property>)}
	</PropertyList>
</SectionContainer>

const Summary = (_: ReadonlyRouteComponentProps) => {
	const personalInfo = useAppSelector(getPersonalInfo())!
	const contactInfo = useAppSelector(getContactInfo())!
	const optionalInfo = useAppSelector(getOptionalInfo())!
	const isEdit = useAppSelector(isEditMode())
	const langKey = useCurrentLangKey()
	const { l10n } = useLocalization()
	const dispatch = useAppDispatch()

	const notificationNames = Object
		.entries(optionalInfo.notifications)
		.filter(([, enabled]) => enabled)
		.map(([type]) => l10n.getString('notification-type', { type }, type))
		.join(', ')

	return <WithInvoiceRegisterFunnelLayout onNext={() => dispatch(SubmitRegistration.create(undefined))} currentStep={5}>
		<Localized id={`register-summary-title-${isEdit ? 'edit' : 'initial'}`}><h3>Registration</h3></Localized>

		<Section id="personal" editLink="/register/personal-info" properties={[
			{ id: 'nickname', value: personalInfo.nickname },
			{ id: 'full-name', value: `${personalInfo.firstName} ${personalInfo.lastName}` },
			{ id: 'pronouns', value: personalInfo.pronouns === null ? '' : l10n.getString('pronouns', { pronouns: personalInfo.pronouns }, personalInfo.pronouns) },
			{ id: 'date-of-birth', value: new Intl.DateTimeFormat(langKey, { dateStyle: 'long' }).format(personalInfo.dateOfBirth) },
			{ id: 'wheelchair-accomodation', value: l10n.getString('register-summary-section-personal-property-wheelchair-accomodation-value', { value: personalInfo.wheelchair.toString() }) },
			{ id: 'spoken-languages', wide: true, value: personalInfo.spokenLanguages.map(langKey => langmap[langKey].nativeName).join(', ') },
		]}/>
		<Section id="contact" editLink="/register/contact-info" properties={[
			{ id: 'email', value: contactInfo.email },
			{ id: 'phone-number', value: contactInfo.phoneNumber },
			{ id: 'street', wide: true, value: contactInfo.street },
			{ id: 'city', value: contactInfo.city },
			{ id: 'postal-code', value: contactInfo.postalCode },
			{ id: 'state-or-province', value: contactInfo.stateOrProvince ?? '' },
			{ id: 'country', value: contactInfo.country },
		]}/>
		<Section id="optional" editLink="/register/optional-info" properties={[
			{ id: 'notifications', wide: true, value: notificationNames },
			{ id: 'comments', wide: true, value: optionalInfo.comments ?? '' },
		]}/>
	</WithInvoiceRegisterFunnelLayout>
}

export default Summary
