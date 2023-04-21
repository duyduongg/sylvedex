import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { NamedApiResource } from '../../models';
import { baseSliceInitialState, BaseSliceState } from '../base-slice-state';

export interface TypesState extends BaseSliceState {
	types: NamedApiResource[];
}

const typesInitialState: TypesState = {
	...baseSliceInitialState,
	types: []
};

const typesSlice = createSlice({
	name: 'types',
	initialState: typesInitialState,
	reducers: {
		requestGettingTypes(state) {
			state.isLoading = true;
		},
		completeGettingTypes(state, action: PayloadAction<NamedApiResource[]>) {
			state.isLoading = false;
			state.types = action.payload;
		},
		failedGettingTypes(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		}
	}
});

export const typesPersistConfig = {
	key: 'types',
	storage,
	whitelist: ['types']
};

export const { requestGettingTypes, completeGettingTypes, failedGettingTypes } = typesSlice.actions;
export const typesActions = typesSlice.actions;
export const typesReducer = persistReducer(typesPersistConfig, typesSlice.reducer);
