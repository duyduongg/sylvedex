import { Effect, fallbackEffect } from '.';

export interface VerboseAbilityEffect extends Effect {
	short_effect: string;
}

export const fallbackVerboseAbilityEffect: VerboseAbilityEffect = {
	short_effect: 'N/A',
	...fallbackEffect
};
