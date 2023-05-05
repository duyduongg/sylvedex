import { Ability, AbilityResource } from '../models';

export const capitalize = (name: string) => {
	return name.at(0)?.toUpperCase() + name.slice(1);
};

export const format = (name: string) => {
	return name
		.split('-')
		.map((s) => capitalize(s))
		.join(' ');
};

export interface CombinedAbility {
	name: string;
	description: string;
}

export const combineAbility = (resource: AbilityResource[], abilities: Ability[]): CombinedAbility[] => {
	if (resource.length === 0 || abilities.length === 0) {
		return [];
	}

	const abilitiesNames = resource.map((r) => {
		return {
			name: format(r.ability.name)
		};
	});
	const abilitiesDescription = abilities.map((r) => {
		return {
			name: format(r.name),
			description:
				r.effect_entries.length !== 0 ? r.effect_entries.filter((e) => e.language.name === 'en')[0].short_effect : 'N/A'
		};
	});

	const map = new Map();
	abilitiesNames.forEach((item) => map.set(item.name, item));
	abilitiesDescription.forEach((item) => map.set(item.name, { ...map.get(item.name), ...item }));
	return Array.from(map.values()) as CombinedAbility[];
};

export const extractIdFromNamedApiResource = (url: string): string => {
	const splittedUrl = url.split('/');
	return splittedUrl[splittedUrl.length - 2];
};
