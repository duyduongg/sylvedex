import { BaseEntity } from './BaseEntity';
import { NamedApiResource } from './NamedApiResource';

export interface Pokedex extends BaseEntity {
	is_main_series: boolean;
	region: NamedApiResource;
	pokemon_entries: {
		entry_number: number;
		pokemon_species: NamedApiResource;
	};
	version_groups: NamedApiResource[];
	names: NamedApiResource[];
	description: { description: string; language: NamedApiResource }[];
}
