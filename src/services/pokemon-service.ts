import { NamedApiResourceList } from '../models';
import { Pokemon } from '../models';
import httpClient from './http-client';

export const pokemonServices = {
	async getPokemons(limit: number, offset: number): Promise<NamedApiResourceList | undefined> {
		const response = await httpClient.get(`/pokemon?limit=${limit}&offset=${offset}`);
		return response?.data as NamedApiResourceList;
	},
	async getPokemon(id: string): Promise<Pokemon | undefined> {
		const response = await httpClient.get(`/pokemon/${id}`);
		return response?.data as Pokemon;
	}
};
