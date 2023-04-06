import { NamedApiResource } from './named-api-resource';

export interface AbilityResource {
	ability: NamedApiResource;
	is_hidden: boolean;
	slot: number;
}
