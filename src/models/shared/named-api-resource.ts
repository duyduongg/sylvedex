import { ApiResource } from './api-resource';

export interface NamedApiResource extends ApiResource {
	name: string;
}

export const fallbackNamedApiResource: NamedApiResource = {
	name: 'N/A',
	url: 'N/A'
};
