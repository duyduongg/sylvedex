import { all } from 'redux-saga/effects';
import { abilitySaga, pokemonDetailSaga, pokemonSaga, typeDetailSaga } from '.';
export default function* rootSaga() {
	yield all([pokemonSaga(), pokemonDetailSaga(), abilitySaga(), typeDetailSaga()]);
}
