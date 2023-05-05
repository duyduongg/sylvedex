import { PokemonType, BaseEntity, AbilityResource, Sprite, Stat } from '..';
import { NamedApiResource } from '../shared/named-api-resource';

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
	species: NamedApiResource;
	[key: string]: any;
}
