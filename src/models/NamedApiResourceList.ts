import { NamedApiResource } from './NamedApiResource';

export interface NamedApiResourceList {
	count: number;
	next: string;
	previous: string;
	results: NamedApiResource[];
}
