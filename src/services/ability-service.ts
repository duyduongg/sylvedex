import { API_ENDPOINT } from '../constants';
import { Ability } from '../models';
import httpClient from './http-client';

export const abilityService = {
	async getAbility(ability: string): Promise<Ability | undefined> {
		const response = await httpClient.get(`${API_ENDPOINT.ABILITY}/${ability}`);
		return response?.data as Ability;
	}
};
