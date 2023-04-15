import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Type } from '../../models';
import { BaseSliceState, baseSliceInitialState } from '../base-slice-state';
export interface TypeDetailState extends BaseSliceState {
	data?: Type;
	id: number;
}

const typeDetailSlice = createSlice({
	name: 'typeDetail',
	initialState: {
		data: undefined,
		id: 1,
		...baseSliceInitialState
	} as TypeDetailState,
	reducers: {
		requestGettingTypeDetail(state, action: PayloadAction<string>) {
			state.isLoading = true;
		},
		completeGettingTypeDetail(state, action: PayloadAction<Type>) {
			state.data = action.payload;
			state.id = action.payload.id;
			state.isLoading = false;
		},
		failedGettingTypeDetail(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		},
		clearTypePokemon(state) {
			state.data = undefined;
		}
	}
});

export const detailPersistConfig = {
	key: 'pokemon-detail',
	storage,
	whitelist: ['data', 'id']
};

export const { requestGettingTypeDetail, completeGettingTypeDetail, failedGettingTypeDetail, clearTypePokemon } =
	typeDetailSlice.actions;
export const typeDetailActions = typeDetailSlice.actions;
export const typeDetailState = persistReducer(detailPersistConfig, typeDetailSlice.reducer);
