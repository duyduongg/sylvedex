import { PokemonType, BaseEntity, AbilityResource, Sprite, Stat } from '.';

export interface Pokemon extends BaseEntity {
	base_experience: number;
	height: number;
	weight: number;
	name: string;
	order: number;
	sprites: Sprite;
	types: PokemonType[];
	stats: Stat[];
	abilities: AbilityResource[];
	[key: string]: any;
}
