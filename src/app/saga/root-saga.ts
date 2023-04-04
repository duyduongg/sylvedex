import { all } from 'redux-saga/effects';
import { pokemonSaga } from './pokemon-saga';
import { regionSaga } from './region-saga';
export default function* rootSaga() {
	yield all([pokemonSaga(), regionSaga()]);
}
