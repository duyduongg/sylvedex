import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Pokemon } from '../../models';

import { baseSliceInitialState, BaseSliceState } from '../base-slice-state';

interface PokemonDetailState extends BaseSliceState {
	pokemonData?: Pokemon;
	id: number;
}

const pokemonDetailSlice = createSlice({
	name: 'pokemon-detail',
	initialState: {
		...baseSliceInitialState,
		pokemonData: undefined,
		id: 1
	} as PokemonDetailState,
	reducers: {
		requestGettingPokemonDetail(state, action: PayloadAction<string>) {
			state.isLoading = true;
		},
		completeGettingPokemonDetail(state, action: PayloadAction<Pokemon>) {
			state.isLoading = false;
			state.isError = false;
			state.pokemonData = action.payload;
			state.id = action.payload.id;
		},
		errorGettingPokemonDetail(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		},
		setCurrentDetailId(state, action: PayloadAction<number>) {
			state.id = action.payload;
		}
	}
});

export const detailPersistConfig = {
	key: 'pokemon-detail',
	storage,
	whitelist: ['pokemonData', 'id']
};

export const {
	requestGettingPokemonDetail,
	completeGettingPokemonDetail,
	errorGettingPokemonDetail,
	setCurrentDetailId
} = pokemonDetailSlice.actions;
export const pokemonDetailActions = pokemonDetailSlice.actions;
export const pokemonDetailReducer = persistReducer(detailPersistConfig, pokemonDetailSlice.reducer);
