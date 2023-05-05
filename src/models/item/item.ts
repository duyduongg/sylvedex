import { BaseEntity, EvolutionChain, ItemSprite, NamedApiResource } from '..';

export interface Item extends BaseEntity {
	name: number;
	cost: number;
	attributes: NamedApiResource;
	baby_trigger_for: EvolutionChain;
	sprites: ItemSprite;
}
