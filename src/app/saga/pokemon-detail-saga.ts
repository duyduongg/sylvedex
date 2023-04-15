import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, take } from 'redux-saga/effects';
import { Pokemon } from '../../models';
import { pokemonServices } from '../../services/pokemon-service';
import { pokemonDetailActions } from '../reducers/pokemon-detail-slice';

function* getPokemonDetail(searchValue: string) {
	try {
		const pokemon: Pokemon = yield call(pokemonServices.getPokemon, searchValue.toLowerCase());
		yield put(pokemonDetailActions.completeGettingPokemonDetail(pokemon));
	} catch (err) {
		if (err instanceof Error) {
			yield put(pokemonDetailActions.errorGettingPokemonDetail(err.message));
		} else {
			yield put(pokemonDetailActions.errorGettingPokemonDetail('An error occured when fetching pokemons list'));
		}
	}
}

function* getPokemonDetailWatcher() {
	while (true) {
		const action: PayloadAction<string> = yield take(pokemonDetailActions.requestGettingPokemonDetail.type);
		yield call(getPokemonDetail, action.payload);
	}
}

export function* pokemonDetailSaga() {
	yield all([getPokemonDetailWatcher()]);
}
