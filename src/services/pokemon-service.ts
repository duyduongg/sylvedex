import { NamedApiResourceList } from '../models';
import { Pokemon } from '../models';
import httpClient from './http-client';
const pokemonEndPoint = '/pokemon';
export const pokemonService = {
	async getPokemons(limit: number, offset: number): Promise<NamedApiResourceList | undefined> {
		const response = await httpClient.get(`${pokemonEndPoint}?limit=${limit}&offset=${offset}`);
		return response?.data as NamedApiResourceList;
	},
	async getPokemon(id: string): Promise<Pokemon | undefined> {
		const response = await httpClient.get(`${pokemonEndPoint}/${id}`);
		return response?.data as Pokemon;
	}
};
