import { EvolutionTrigger, Item, NamedApiResource } from '..';
export interface EvolutionDetail {
	item: Item;
	trigger: EvolutionTrigger;
	gender: number;
	held_item: NamedApiResource;
	min_level: number;
	min_happiness: number;
	min_beauty: number;
	min_affection: number;
	needs_overworld_rain: boolean;
	party_species: NamedApiResource;
	relative_physical_stats: number;
	time_of_day: string;
	trade_species: NamedApiResource;
	turn_upside_down: boolean;
}
