import { API_ENDPOINT } from '../constants';
import { EvolutionChain } from '../models';
import httpClient from './http-client';

export const evolutionService = {
	async getEvolutionChain(id: string): Promise<EvolutionChain | undefined> {
		const response = await httpClient.get(`${API_ENDPOINT.EVOLUTION_CHAIN}/${id}`);
		return response.data;
	}
};
