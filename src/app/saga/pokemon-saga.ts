import { all, call, put, take } from 'redux-saga/effects';
import { NamedApiResource, NamedApiResourceList, Pokemon } from '../../models';
import { pokemonService } from '../../services/pokemon-service';
import { appSelect } from '../hooks';
import { pokemonActions } from '../reducers/pokemon-slice';

export function* getPokemonsDataFromNamedApiResource(resourceList: NamedApiResource[]) {
	let idList: string[] = [];
	resourceList.map((v) =>
		idList.push(v.url.slice(`${import.meta.env.VITE_API_BASE_URL}/pokemon/`.length - 1, v.url.length - 1))
	);
	let pokemonList: Pokemon[] = [];

	pokemonList = yield all(
		idList.map((id) => {
			return call(pokemonService.getPokemon, id);
		})
	);
	return pokemonList;
}

export function* updatePokemonsData(data: Pokemon[], total: number) {
	yield put(pokemonActions.completeGettingPokemons([data, total]));
}

function* getPaginationState() {
	const state = yield* appSelect((state) => {
		return {
			limit: state.pokemonState.limit,
			offset: state.pokemonState.offset,
			total: state.pokemonState.total
		};
	});
	return state;
}

function* getPokemons() {
	try {
		const state: { limit: number; offset: number; total: number } = yield getPaginationState();
		const type = yield* appSelect((state) => state.typeDetailState.typeData);
		const localStorageState = JSON.parse(localStorage.getItem('persist:pokemon') || '');

		// Refetch if: Change page, first time fetching
		if (
			state.offset !== parseInt(localStorageState?.offset) ||
			parseInt(localStorageState?.total) === 0 ||
			type === undefined
		) {
			const resourceList: NamedApiResourceList = yield call(pokemonService.getPokemons, state.limit, state.offset);
			const pokemonList: Pokemon[] = yield call(getPokemonsDataFromNamedApiResource, resourceList.results);
			yield call(updatePokemonsData, pokemonList, resourceList.count);
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

function* getPokemonsFromArray() {
	try {
		const type = yield* appSelect((state) => state.typeDetailState.typeData);
		const state: { limit: number; offset: number } = yield getPaginationState();
		const pokemons: NamedApiResource[] = [];
		if (type !== undefined) {
			type.pokemon.slice(state.offset, state.limit + state.offset).map((t) => pokemons.push(t.pokemon));
			const pokemonList: Pokemon[] = yield call(getPokemonsDataFromNamedApiResource, pokemons);
			yield call(updatePokemonsData, pokemonList, type.pokemon.length);
		}
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
		} else {
			console.log('Error occurred while getting pokemons by type');
		}
	}
}

function* getPokemonsFromArrayWatcher() {
	while (true) {
		yield take(pokemonActions.requestGettingPokemonsFromArray);
		yield call(getPokemonsFromArray);
	}
}

export function* pokemonSaga() {
	yield all([getPokemonsWatcher(), getPokemonsFromArrayWatcher()]);
}
