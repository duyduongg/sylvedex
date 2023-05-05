import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { EvolutionChain, Pokemon, PokemonSpecies } from '../../models';

import { baseSliceInitialState, BaseSliceState } from '../base-slice-state';

export interface NestedRelatedPokemon {
	pokemon: Pokemon;
	related: NestedRelatedPokemon[];
}
interface PokemonDetailState extends BaseSliceState {
	pokemonData?: Pokemon;
	id: number;
	species?: PokemonSpecies;
	evolutionChain?: EvolutionChain;
	nestedRelatedPokemons: NestedRelatedPokemon[];
}

const pokemonDetailSlice = createSlice({
	name: 'pokemon-detail',
	initialState: {
		...baseSliceInitialState,
		pokemonData: undefined,
		species: undefined,
		evolutionChain: undefined,
		nestedRelatedPokemons: [],
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
		},
		setSpecies(state, action: PayloadAction<PokemonSpecies>) {
			state.species = action.payload;
		},
		setEvolutionChain(state, action: PayloadAction<EvolutionChain>) {
			state.evolutionChain = action.payload;
		},
		setRelatedPokemons(state, action: PayloadAction<NestedRelatedPokemon[]>) {
			state.nestedRelatedPokemons = action.payload;
		}
	}
});

const pokemonDetailPersistConfig = {
	key: 'pokemon-detail',
	storage,
	whitelist: ['evolutionChain', 'nestedRelatedPokemons']
};

export const {
	requestGettingPokemonDetail,
	completeGettingPokemonDetail,
	errorGettingPokemonDetail,
	setCurrentDetailId,
	setSpecies,
	setEvolutionChain,
	setRelatedPokemons
} = pokemonDetailSlice.actions;
export const pokemonDetailActions = pokemonDetailSlice.actions;
export const pokemonDetailReducer = persistReducer(pokemonDetailPersistConfig, pokemonDetailSlice.reducer);
