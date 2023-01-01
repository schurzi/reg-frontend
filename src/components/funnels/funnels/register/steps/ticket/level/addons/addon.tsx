import { Localized } from '@fluent/react'
import config from '~/config'
import { useFunnelForm } from '~/hooks/funnels/form'
import TicketLevelAddonControl from './control'
import TicketLevelAddonOption, { AugmentedOption } from './options/option'
import { useEffect } from 'react'

export type AugmentedAddon = {
	[K in keyof typeof config.addons]: (typeof config.addons)[K] & {
		readonly id: K
	}
}[keyof typeof config.addons]

export interface TicketLevelAddonProps {
	readonly addon: AugmentedAddon
	readonly formContext: ReturnType<typeof useFunnelForm<'register-ticket-level'>>
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const TicketLevelAddon = ({ addon, formContext }: TicketLevelAddonProps) => {
	const { watch, register, setValue } = formContext

	const level = watch('level')

	const isIncluded = level !== null && (config.ticketLevels[level].includes as readonly string[]).includes(addon.id)

	useEffect(() => {
		setValue(`addons.${addon.id}.selected`, isIncluded ? true : addon.default)
	}, [level])

	return <Localized id={`register-ticket-level-addons-item-${addon.id}`} attrs={{ label: true, description: true, price: true }}>
		<TicketLevelAddonControl
			label={addon.id}
			description={addon.id}
			price={isIncluded ? 0 : addon.price}
			disabled={isIncluded}
			{...register(`addons.${addon.id}.selected`)}
		>
			{Object.entries(addon.options).map(([id, option]) =>
				// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
				<TicketLevelAddonOption key={id} option={{ id, addonId: addon.id, ...option } as AugmentedOption} formContext={formContext}/>,
			)}
		</TicketLevelAddonControl>
	</Localized>
}

export default TicketLevelAddon
