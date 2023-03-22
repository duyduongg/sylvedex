import { BaseEntity } from './base-entity';
import { Sprite } from './sprite';
import { PokemonType } from './type';

export interface Pokemon extends BaseEntity {
	base_experience: number;
	height: number;
	weight: number;

	order: number;
	sprites: Sprite;
	types: PokemonType[];
	[key: string]: any;
}
