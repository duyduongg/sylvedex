import { EvolutionDetail, NamedApiResource, PokemonSpecies } from '..';
export interface ChainLink {
	is_baby: boolean;
	species: NamedApiResource;
	evolution_details: EvolutionDetail[];
	evolves_to: ChainLink[];
}
