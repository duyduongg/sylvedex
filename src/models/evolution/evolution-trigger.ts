import { BaseEntity, PokemonSpecies } from '..';

export interface EvolutionTrigger extends BaseEntity {
	name: string;
	pokemon_species: PokemonSpecies;
}
