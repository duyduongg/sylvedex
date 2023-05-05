import { BaseEntity, ChainLink, NamedApiResource } from '..';

export interface EvolutionChain extends BaseEntity {
	baby_trigger_item: NamedApiResource;
	chain: ChainLink;
}
