import { combineReducers } from '@reduxjs/toolkit';
import { pokemonState } from './pokemon-slice';
import { abilityState } from './ability-slice';

export const rootReducer = combineReducers({ pokemonState: pokemonState, abilityState: abilityState });
export type RootReducer = ReturnType<typeof rootReducer>;
