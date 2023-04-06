import { all } from 'redux-saga/effects';
import { pokemonSaga } from './pokemon-saga';
import { abilitySaga } from './ability-saga';
export default function* rootSaga() {
	yield all([pokemonSaga(), abilitySaga()]);
}
