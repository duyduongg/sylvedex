import { NamedApiResource } from '..';

export interface AbilityResource {
	ability: NamedApiResource;
	is_hidden: boolean;
	slot: number;
}
