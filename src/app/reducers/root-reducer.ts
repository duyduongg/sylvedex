import { combineReducers } from '@reduxjs/toolkit';
import { abilityState, pokemonDetailState, pokemonState, typeDetailState } from '.';

export const rootReducer = combineReducers({
	pokemonState: pokemonState,
	pokemonDetailState: pokemonDetailState,
	abilityState: abilityState,
	typeDetailState: typeDetailState
});
export type RootReducer = ReturnType<typeof rootReducer>;
