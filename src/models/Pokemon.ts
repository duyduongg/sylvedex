import { BaseEntity } from './BaseEntity';
import { Sprite } from './Sprite';
import { PokemonType } from './Type';

export interface Pokemon extends BaseEntity {
	base_experience: number;
	height: number;
	weight: number;

	order: number;
	sprites: Sprite;
	types: PokemonType[];
	[key: string]: any;
}
