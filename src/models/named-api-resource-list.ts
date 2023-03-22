import { NamedApiResource } from './named-api-resource';

export interface NamedApiResourceList {
	count: number;
	next: string;
	previous: string;
	results: NamedApiResource[];
}
