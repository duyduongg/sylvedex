import { fallbackNamedApiResource, NamedApiResource } from './named-api-resource';

export interface Effect {
	effect: string;
	language: NamedApiResource;
}

export const fallbackEffect: Effect = {
	effect: 'N/A',
	language: fallbackNamedApiResource
};
