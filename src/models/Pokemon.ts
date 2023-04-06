import { Ability } from './ability';
import { BaseEntity } from './base-entity';
import { Sprite } from './sprite';
import { Stat } from './stat';
import { PokemonType } from './type';

export interface Pokemon extends BaseEntity {
	base_experience: number;
	height: number;
	weight: number;
	name: string;
	order: number;
	sprites: Sprite;
	types: PokemonType[];
	stats: Stat[];
	abilities: Ability[];
	[key: string]: any;
}
