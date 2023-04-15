import {
	AbilityEffectChange,
	BaseEntity,
	fallbackAbilityEffectChange,
	fallbackVerboseAbilityEffect,
	VerboseAbilityEffect
} from '.';

export interface Ability extends BaseEntity {
	name: string;
	effect_entries: VerboseAbilityEffect[];
	effect_changes: AbilityEffectChange[];
}

export const fallbackAbility: Ability = {
	id: 0,
	name: 'N/A',
	effect_entries: [fallbackVerboseAbilityEffect],
	effect_changes: [fallbackAbilityEffectChange]
};
