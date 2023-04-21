import { BaseEntity, NamedApiResource } from '.';

export interface Type extends BaseEntity {
	damage_relations: TypeRelations;
	generation: NamedApiResource;
	move_damage_class: NamedApiResource;
	moves: NamedApiResource[];
	name: string;
	pokemon: TypePokemon[]; // Store all pokemon named api resource
	[key: string]: any;
}

export interface TypeRelations {
	double_damage_from: NamedApiResource[];
	double_damage_to: NamedApiResource[];
	half_damage_from: NamedApiResource[];
	half_damage_to: NamedApiResource[];
	no_damage_from: NamedApiResource[];
	no_damage_to: NamedApiResource[];
}

export interface TypePokemon {
	pokemon: NamedApiResource;
	slot: number;
}
