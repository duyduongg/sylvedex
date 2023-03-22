import { all } from 'redux-saga/effects';
import { pokemonSaga } from './PokemonSaga';
export default function* rootSaga() {
	yield all([pokemonSaga()]);
}
