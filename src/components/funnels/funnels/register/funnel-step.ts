import { createFunnelStep } from '~/components/funnels/funnel-step'
import { getNextStep, isEditMode } from '~/state/selectors/register'

export const funnelStep = createFunnelStep({
	getNextStep,
	isEditMode,
	paths: [
		'/register/ticket/type',
		'/register/ticket/level',
		'/register/personal-info',
		'/register/contact-info',
		'/register/optional-info',
	],
})
