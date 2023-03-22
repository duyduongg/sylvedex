import { combineReducers } from '@reduxjs/toolkit';
import { pokemonState } from './PokemonSlice';
import { regionState } from './RegionSlice';

export const rootReducer = combineReducers({ pokemonState: pokemonState, regionState: regionState });
export type RootReducer = ReturnType<typeof rootReducer>;
