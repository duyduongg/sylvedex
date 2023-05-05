import { fallbackNamedApiResource, NamedApiResource } from '..';

export interface Effect {
	effect: string;
	language: NamedApiResource;
}

export const fallbackEffect: Effect = {
	effect: 'N/A',
	language: fallbackNamedApiResource
};
