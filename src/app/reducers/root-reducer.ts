import { combineReducers } from '@reduxjs/toolkit';
import { abilityReducer, pokemonDetailReducer, pokemonReducer, typeDetailReducer, typesReducer } from '.';

export const rootReducer = combineReducers({
	pokemonState: pokemonReducer,
	pokemonDetailState: pokemonDetailReducer,
	abilityState: abilityReducer,
	typeDetailState: typeDetailReducer,
	typesState: typesReducer
});
export type RootReducer = ReturnType<typeof rootReducer>;
