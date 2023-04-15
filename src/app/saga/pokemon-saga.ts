import { all, call, put, take } from 'redux-saga/effects';
import { NamedApiResourceList, Pokemon } from '../../models';
import { pokemonServices } from '../../services/pokemon-service';
import { appSelect } from '../hooks';
import { pokemonActions } from '../reducers/pokemon-slice';

function* getPokemons() {
	try {
		const state = yield* appSelect((state) => {
			return {
				limit: state.pokemonState.limit,
				offset: state.pokemonState.offset,
				total: state.pokemonState.total
			};
		});
		const localStorageState = JSON.parse(localStorage.getItem('persist:pokemon') || '');

		// Refetch if: Change page, first time fetching
		if (state.offset !== parseInt(localStorageState?.offset) || parseInt(localStorageState?.total) === 0) {
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
			yield put(pokemonActions.completeGettingPokemons([pokemonList, resourceList.count]));
		} else {
			console.log('Get from local storage');
		}
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
	yield all([getPokemonsWatcher()]);
}
