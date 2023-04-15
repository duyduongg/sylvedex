import { NamedApiResource } from '.';

export interface NamedApiResourceList {
	count: number;
	next: string;
	previous: string;
	results: NamedApiResource[];
}
