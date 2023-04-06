export interface NamedApiResource {
	name: string;
	url: string;
}

export const fallbackNamedApiResource: NamedApiResource = {
	name: 'N/A',
	url: 'N/A'
};
