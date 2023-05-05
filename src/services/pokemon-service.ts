import { API_ENDPOINT } from '../constants';
import { NamedApiResourceList } from '../models';
import { Pokemon } from '../models';
import httpClient from './http-client';
export const pokemonService = {
	async getPokemons(limit: number, offset: number): Promise<NamedApiResourceList | undefined> {
		const response = await httpClient.get(`${API_ENDPOINT.POKEMON}?limit=${limit}&offset=${offset}`);
		return response?.data as NamedApiResourceList;
	},
	async getPokemon(id: string): Promise<Pokemon | undefined> {
		const response = await httpClient.get(`${API_ENDPOINT.POKEMON}/${id}`);
		return response?.data as Pokemon;
	}
};
