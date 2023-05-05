import { ApiResource, BaseEntity, NamedApiResource } from '..';

export interface PokemonSpecies extends BaseEntity {
	name: string;
	order: number;
	evolves_from_species: NamedApiResource;
	evolution_chain: ApiResource;
	[key: string]: any;
}
