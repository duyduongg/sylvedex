import { Effect, fallbackEffect } from './effect';
import { fallbackNamedApiResource, NamedApiResource } from './named-api-resource';

export interface AbilityEffectChange {
	effect_entries: Effect;
	version_groups: NamedApiResource;
}

export const fallbackAbilityEffectChange: AbilityEffectChange = {
	effect_entries: fallbackEffect,
	version_groups: fallbackNamedApiResource
};
