import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, CallEffect, put, take } from 'redux-saga/effects';
import { PERSIST_STORE_KEY } from '../../constants';
import { extractIdFromNamedApiResource } from '../../helpers';
import { ChainLink, EvolutionChain, Pokemon, PokemonSpecies } from '../../models';
import { evolutionService } from '../../services/evolution-service';
import { pokemonService } from '../../services/pokemon-service';
import { pokemonSpeciesService } from '../../services/pokemon-species';
import { NestedRelatedPokemon, pokemonDetailActions } from '../reducers/pokemon-detail-slice';

function* getRelatedPokemonInEvolutionChain(
	links: ChainLink[]
): Generator<CallEffect<Pokemon | undefined> | NestedRelatedPokemon[]> {
	const nestedRelatedPokemons: NestedRelatedPokemon[] = [];
	if (links.length === 0) {
		return nestedRelatedPokemons;
	}
	for (const link of links) {
		const pokemon = yield call(pokemonService.getPokemon, link.species.name.toLowerCase());
		const nested: NestedRelatedPokemon[] = yield* getRelatedPokemonInEvolutionChain(link.evolves_to);
		nestedRelatedPokemons.push({ pokemon: pokemon as Pokemon, related: nested });
	}
	return nestedRelatedPokemons;
}

function* getEvolutionChain(id: string) {
	const evolutionChain: EvolutionChain = yield call(evolutionService.getEvolutionChain, id);
	const firstPokemon: Pokemon = yield call(
		pokemonService.getPokemon,
		extractIdFromNamedApiResource(evolutionChain.chain.species.url)
	);
	yield put(pokemonDetailActions.setEvolutionChain(evolutionChain));

	// Get related pokemons in the evolution chain
	const nestedRelatedPokemons: NestedRelatedPokemon[] = yield call(
		getRelatedPokemonInEvolutionChain,
		evolutionChain.chain.evolves_to
	);

	yield put(pokemonDetailActions.setRelatedPokemons([{ pokemon: firstPokemon, related: nestedRelatedPokemons }]));
}

function* getPokemonDetail(searchValue: string) {
	try {
		// Get pokemon detail information base on search value
		const pokemon: Pokemon = yield call(pokemonService.getPokemon, searchValue.toLowerCase());

		// Extract species identifier from pokemon info and get
		const speciesId = extractIdFromNamedApiResource(pokemon.species.url);
		const species: PokemonSpecies = yield call(pokemonSpeciesService.getSpeciesById, speciesId);

		// Get evolution chain
		const localStorageState = JSON.parse(localStorage.getItem(`persist:${PERSIST_STORE_KEY.POKEMON_DETAIL}`) || '');
		const evolutionChainId = extractIdFromNamedApiResource(species.evolution_chain.url);
		if (localStorageState?.evolutionChain?.id !== evolutionChainId) {
			yield call(getEvolutionChain, evolutionChainId);
		} else {
			console.log('Get from store');
		}
		yield put(pokemonDetailActions.completeGettingPokemonDetail(pokemon));
	} catch (err) {
		if (err instanceof Error) {
			yield put(pokemonDetailActions.errorGettingPokemonDetail(err.message));
		} else {
			yield put(pokemonDetailActions.errorGettingPokemonDetail('An error occured when fetching pokemons detail'));
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
