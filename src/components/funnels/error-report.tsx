import styled from '@emotion/styled'
import { Button } from '@eurofurence/reg-component-library'
import { Localized } from '@fluent/react'
import ReactMarkdown from 'react-markdown'
import conCat from '~/images/con-cats/days/wednesday.png'
import { AppError, FrontendAppError } from '~/state/models/errors'
import SplashFunnelLayout from './layout/splash'

const BackButton = styled(Button)`
	margin-top: 2em;
`

export interface FunnelErrorReportProps {
	readonly error: Readonly<Error>
	readonly onBack: () => void
}

const FunnelErrorReport = ({ error, onBack }: FunnelErrorReportProps) => {
	const { operation, category, code } = error instanceof AppError ? error as AppError : new FrontendAppError('unknown', 'unknown', error.message)

	return <SplashFunnelLayout image={conCat}>
		<Localized id="funnel-error-report-title"><h1>Oh no...</h1></Localized>
		<Localized id="funnel-error-report-operation" vars={{ operation }}><h2>We encountered an error trying to handle your request.</h2></Localized>
		<Localized id="funnel-error-report-message" vars={{ category, code }}>
			<ReactMarkdown>
				An error occurred when we tried to handle your request.
				Please try again later. If this problem persists, try clearing your browser&apos;s cache and refreshing the page.
				If that doesn&apos;t resolve the problem, contact support.
			</ReactMarkdown>
		</Localized>
		<Localized id="funnel-error-report-back">
			<BackButton onClick={onBack}>Go back</BackButton>
		</Localized>
	</SplashFunnelLayout>
}

export default FunnelErrorReport
