import { NamedApiResource } from './named-api-resource';

export interface Ability {
	ability: NamedApiResource;
	is_hidden: boolean;
	slot: number;
}
