import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, take } from 'redux-saga/effects';
import { NamedApiResourceList } from '../../models/named-api-resource-list';
import { Pokemon } from '../../models/pokemon';
import { pokemonServices } from '../../services/pokemon-service';
import { appSelect } from '../hooks';
import { pokemonActions } from '../reducers/pokemon-slice';
function* getPokemonDetail(id: string) {
	try {
		const pokemon: Pokemon = yield call(pokemonServices.getPokemon, id);
		yield put(pokemonActions.completeGettingPokemonDetail(pokemon));
	} catch (err) {
		if (err instanceof Error) {
			yield put(pokemonActions.errorGettingPokemonDetail(err.message));
		} else {
			yield put(pokemonActions.errorGettingPokemonDetail('An error occured when fetching pokemons list'));
		}
	}
}

function* getPokemonDetailWatcher() {
	while (true) {
		const action: PayloadAction<string> = yield take(pokemonActions.requestGettingPokemonDetail.type);
		yield call(getPokemonDetail, action.payload);
	}
}

function* getPokemons() {
	try {
		const state = yield* appSelect((state) => {
			return {
				limit: state.pokemonState.limit,
				offset: state.pokemonState.offset
			};
		});
		const resourceList: NamedApiResourceList = yield call(pokemonServices.getPokemons, state.limit, state.offset);
		let idList: string[] = [];
		resourceList.results.map((v) =>
			idList.push(v.url.slice(`${import.meta.env.VITE_API_BASE_URL}/pokemon/`.length - 1, v.url.length - 1))
		);
		let pokemonList: Pokemon[] = [];

		pokemonList = yield all(
			idList.map((id) => {
				return call(pokemonServices.getPokemon, id);
			})
		);
		yield put(pokemonActions.completeGettingPokemons(pokemonList));
	} catch (err) {
		if (err instanceof Error) {
			yield put(pokemonActions.errorGettingPokemons(err.message));
		} else {
			yield put(pokemonActions.errorGettingPokemons('An error occured when fetching pokemons list'));
		}
	}
}
function* getPokemonsWatcher() {
	while (true) {
		yield take(pokemonActions.requestGettingPokemons.type);
		yield call(getPokemons);
	}
}

export function* pokemonSaga() {
	yield all([getPokemonsWatcher(), getPokemonDetailWatcher()]);
}
