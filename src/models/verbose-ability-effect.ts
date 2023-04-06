import { Effect, fallbackEffect } from './effect';
import { NamedApiResource } from './named-api-resource';

export interface VerboseAbilityEffect extends Effect {
	short_effect: string;
}

export const fallbackVerboseAbilityEffect: VerboseAbilityEffect = {
	short_effect: 'N/A',
	...fallbackEffect
};
