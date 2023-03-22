import { combineReducers } from '@reduxjs/toolkit';
import { pokemonState } from './pokemon-slice';
import { regionState } from './region-slice';

export const rootReducer = combineReducers({ pokemonState: pokemonState, regionState: regionState });
export type RootReducer = ReturnType<typeof rootReducer>;
