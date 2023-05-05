import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { Pokemon } from '../../models';
import { baseSliceInitialState, BaseSliceState } from '../base-slice-state';
interface PokemonsState extends BaseSliceState {
	limit: number;
	offset: number;
	list: Pokemon[];
	total: number;
}

const initialState: PokemonsState = {
	...baseSliceInitialState,
	list: [],
	limit: 12,
	offset: 0,
	total: 0
};
const pokemonsSlice = createSlice({
	name: 'pokemons',
	initialState,
	reducers: {
		requestGettingPokemons(state, action: PayloadAction<number | undefined>) {
			state.isLoading = true;
			const factor = action.payload;
			if (factor) {
				state.offset = factor >= 0 ? (factor - 1) * state.limit : 0;
			}
		},
		requestGettingPokemonsFromArray(state, action: PayloadAction<number | undefined>) {
			state.isLoading = true;
			const factor = action.payload;
			if (factor) {
				state.offset = factor >= 0 ? (factor - 1) * state.limit : 0;
			}
		},
		completeGettingPokemons(state, action: PayloadAction<[Pokemon[], number]>) {
			state.isLoading = false;
			state.isError = false;
			state.list = action.payload[0];
			state.total = action.payload[1];
		},
		errorGettingPokemons(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		},
		resetOffset(state) {
			state.offset = initialState.offset;
		}
	}
});

const pokemonsPersistConfig = {
	key: 'pokemons',
	storage,
	whitelist: ['list', 'offset', 'total']
};

export const {
	requestGettingPokemons,
	requestGettingPokemonsFromArray,
	completeGettingPokemons,
	errorGettingPokemons
} = pokemonsSlice.actions;
export const pokemonsActions = pokemonsSlice.actions;
export const pokemonsReducer = persistReducer(pokemonsPersistConfig, pokemonsSlice.reducer);
