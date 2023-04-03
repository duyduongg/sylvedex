import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { Pokemon } from '../../models/pokemon';
import { baseSliceInitialState, BaseSliceState } from '../base-slice-state';
interface PokemonState extends BaseSliceState {
	limit: number;
	offset: number;
	list: Pokemon[];
	detail: Pokemon;
}
const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState: {
		...baseSliceInitialState,
		list: [],
		limit: 24,
		offset: 0,
		detail: {} as Pokemon
	} as PokemonState,
	reducers: {
		requestGettingPokemons(state, action: PayloadAction<number | undefined>) {
			state.isLoading = true;
			let factor = action.payload;
			if (factor) {
				state.offset = factor >= 0 ? (factor - 1) * state.limit : 0;
			}
		},
		completeGettingPokemons(state, action: PayloadAction<Pokemon[]>) {
			state.isLoading = false;
			state.isError = false;
			state.list = action.payload;
		},
		errorGettingPokemons(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		},
		requestGettingPokemonDetail(state, action: PayloadAction<string>) {
			state.isLoading = true;
		},
		completeGettingPokemonDetail(state, action: PayloadAction<Pokemon>) {
			state.isLoading = false;
			state.isError = false;
			state.detail = action.payload;
		},
		errorGettingPokemonDetail(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		}
	}
});

const pokemonPersistConfig = {
	key: 'pokemon',
	storage,
	whitelist: ['list', 'detail', 'offset']
};

export const {
	requestGettingPokemons,
	completeGettingPokemons,
	errorGettingPokemons,
	requestGettingPokemonDetail,
	completeGettingPokemonDetail,
	errorGettingPokemonDetail
} = pokemonSlice.actions;
export const pokemonActions = pokemonSlice.actions;
export const pokemonState = persistReducer(pokemonPersistConfig, pokemonSlice.reducer);

type D = typeof requestGettingPokemons;
