import { API_ENDPOINT } from '../constants';
import { NamedApiResourceList, Type } from '../models';
import httpClient from './http-client';

export const typeService = {
	async getTypeDetail(name: string): Promise<Type | undefined> {
		const response = await httpClient.get(`${API_ENDPOINT.TYPE}/${name}`);
		return response?.data as Type;
	},
	async getTypes(): Promise<NamedApiResourceList | undefined> {
		const response = await httpClient.get(`${API_ENDPOINT.TYPE}`);
		return response?.data as NamedApiResourceList;
	}
};
