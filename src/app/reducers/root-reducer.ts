import { combineReducers } from '@reduxjs/toolkit';
import { pokemonState } from './pokemon-slice';
import { abilityState } from './ability-slice';
import { pokemonDetailState } from './pokemon-detail-slice';

export const rootReducer = combineReducers({
	pokemonState: pokemonState,
	pokemonDetailState: pokemonDetailState,
	abilityState: abilityState
});
export type RootReducer = ReturnType<typeof rootReducer>;
