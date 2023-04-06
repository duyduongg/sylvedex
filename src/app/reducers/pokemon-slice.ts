import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { Pokemon } from '../../models/pokemon';
import { baseSliceInitialState, BaseSliceState } from '../base-slice-state';
interface PokemonState extends BaseSliceState {
	limit: number;
	offset: number;
	list: Pokemon[];
	total: number;
	detail: {
		data: Pokemon;
		id: number;
		isLoading: boolean;
		isError: boolean;
	};
}
const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState: {
		...baseSliceInitialState,
		list: [],
		limit: 12,
		offset: 0,
		total: 0,
		detail: {
			data: {} as Pokemon,
			id: 1,
			isError: false,
			isLoading: false
		}
	} as PokemonState,
	reducers: {
		requestGettingPokemons(state, action: PayloadAction<number | undefined>) {
			state.isLoading = true;
			let factor = action.payload;
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
		requestGettingPokemonDetail(state, action: PayloadAction<string>) {
			state.detail.isLoading = true;
		},
		completeGettingPokemonDetail(state, action: PayloadAction<Pokemon>) {
			state.detail.isLoading = false;
			state.detail.isError = false;
			state.detail.data = action.payload;
			state.detail.id = action.payload.id;
		},
		errorGettingPokemonDetail(state, action: PayloadAction<string>) {
			state.detail.isLoading = false;
			state.detail.isError = true;
			state.errorMessage = action.payload;
		},
		setCurrentDetailId(state, action: PayloadAction<number>) {
			state.detail.id = action.payload;
		}
	}
});

const pokemonPersistConfig = {
	key: 'pokemon',
	storage,
	whitelist: ['list', 'detail', 'offset', 'total']
};

export const {
	requestGettingPokemons,
	completeGettingPokemons,
	errorGettingPokemons,
	requestGettingPokemonDetail,
	completeGettingPokemonDetail,
	errorGettingPokemonDetail,
	setCurrentDetailId
} = pokemonSlice.actions;
export const pokemonActions = pokemonSlice.actions;
export const pokemonState = persistReducer(pokemonPersistConfig, pokemonSlice.reducer);
