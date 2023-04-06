import { AbilityEffectChange, fallbackAbilityEffectChange } from './ability-effect-change';
import { fallbackVerboseAbilityEffect, VerboseAbilityEffect } from './verbose-ability-effect';

export interface Ability {
	id: number;
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
