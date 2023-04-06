import { Ability } from '../models/ability';
import httpClient from './http-client';

export const abilityServies = {
	async getAbility(ability: string): Promise<Ability | undefined> {
		const response = await httpClient.get(`/ability/${ability}`);
		return response?.data as Ability;
	}
};
