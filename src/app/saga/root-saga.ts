import { all } from 'redux-saga/effects';
import { pokemonSaga } from './pokemon-saga';
import { abilitySaga } from './ability-saga';
import { pokemonDetailSaga } from './pokemon-detail-saga';
export default function* rootSaga() {
	yield all([pokemonSaga(), pokemonDetailSaga(), abilitySaga()]);
}
