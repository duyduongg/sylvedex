import { NamedApiResource } from './named-api-resource';

export interface Stat {
	base_stat: number;
	effort: number;
	stat: NamedApiResource;
}
