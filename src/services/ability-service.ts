import { Ability } from '../models';
import httpClient from './http-client';

const abilityEndpoint = '/ability';
export const abilityService = {
	async getAbility(ability: string): Promise<Ability | undefined> {
		const response = await httpClient.get(`${abilityEndpoint}/${ability}`);
		return response?.data as Ability;
	}
};
