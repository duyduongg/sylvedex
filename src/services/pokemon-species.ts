import { API_ENDPOINT } from '../constants';
import { PokemonSpecies } from '../models';
import httpClient from './http-client';

export const pokemonSpeciesService = {
	async getSpeciesById(id: string): Promise<PokemonSpecies | undefined> {
		const response = await httpClient.get(`${API_ENDPOINT.POKEMON_SPECIES}/${id}`);
		return response.data as PokemonSpecies;
	}
};
