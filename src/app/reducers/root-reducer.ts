import { combineReducers } from '@reduxjs/toolkit';
import { abilityReducer, pokemonDetailReducer, pokemonsReducer, typeDetailReducer, typesReducer } from '.';

export const rootReducer = combineReducers({
	pokemonsState: pokemonsReducer,
	pokemonDetailState: pokemonDetailReducer,
	abilityState: abilityReducer,
	typeDetailState: typeDetailReducer,
	typesState: typesReducer
});
export type RootReducer = ReturnType<typeof rootReducer>;
