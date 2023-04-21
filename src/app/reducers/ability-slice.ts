import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';
import { Ability } from '../../models/ability';
import { baseSliceInitialState, BaseSliceState } from '../base-slice-state';

interface AbilitySlice extends BaseSliceState {
	data: Ability[];
}

const abilitySlice = createSlice({
	name: 'ability',
	initialState: {
		...baseSliceInitialState,
		data: []
	} as AbilitySlice,
	reducers: {
		requestGettingAbilities(state, action: PayloadAction<string[]>) {
			state.isLoading = true;
			state.data = [];
		},
		completeGettingAbilities(state, action: PayloadAction<Ability[]>) {
			state.isLoading = false;
			state.isError = false;
			state.data = action.payload;
		},
		errorGettingAbilities(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		}
	}
});

const abilityPersistConfig = {
	key: 'ability',
	storage,
	whitelist: []
};

export const { requestGettingAbilities, completeGettingAbilities, errorGettingAbilities } = abilitySlice.actions;
export const abilityAction = abilitySlice.actions;
export const abilityReducer = persistReducer(abilityPersistConfig, abilitySlice.reducer);
