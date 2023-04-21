import { NamedApiResourceList, Type } from '../models';
import httpClient from './http-client';

const typeEndpoint = '/type';
export const typeService = {
	async getTypeDetail(name: string): Promise<Type | undefined> {
		const response = await httpClient.get(`${typeEndpoint}/${name}`);
		return response?.data as Type;
	},
	async getTypes(): Promise<NamedApiResourceList | undefined> {
		const response = await httpClient.get(`${typeEndpoint}`);
		return response?.data as NamedApiResourceList;
	}
};
