import { Localized, useLocalization } from '@fluent/react'
import { useMemo } from 'react'
import { Select } from '@eurofurence/reg-component-library'
import { useFunnelForm } from '~/hooks/funnels/form'
import type { AugmentedOption, ValidOptionPaths } from './option'

export interface TicketLevelSelectAddonOptionProps {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
	readonly option: AugmentedOption<'select'>
	readonly formContext: ReturnType<typeof useFunnelForm<'register-ticket-level'>>
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const TicketLevelSelectAddonOption = ({ option, formContext: { control, watch, formState: { errors }, FunnelController } }: TicketLevelSelectAddonOptionProps) => {
	const { l10n } = useLocalization()

	const selected = watch(`addons.${option.addonId}.selected`)

	const { items, itemsByValue } = useMemo(() => {
		const items = option.items.map(value => ({
			value,
			label: l10n.getString(`register-ticket-level-addons-item-${option.addonId}-option-${option.id}-value`, { value }),
		}))

		return { items, itemsByValue: new Map(items.map(item => [item.value, item])) }
	}, [l10n])

	return <FunnelController
		name={`addons.${option.addonId}.options.${option.id}` as ValidOptionPaths}
		control={control}
		rules={{ required: selected }}
		render={({ field: { onChange, value, ref, ...field } }) =>
			<Localized id={`register-ticket-level-addons-item-${option.addonId}-option-${option.id}`} attrs={{ label: true }}>
				<Select
					label={option.id}
					isSearchable={false}
					options={items}
					onChange={item => onChange(item?.value)}
					value={value === null ? null : itemsByValue.get(value)}
					error={errors.addons?.[option.addonId]?.options?.[option.id]?.message}
					{...field}
				/>
			</Localized>
		}
	/>
}

export default TicketLevelSelectAddonOption
