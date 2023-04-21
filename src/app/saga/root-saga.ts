import { all } from 'redux-saga/effects';
import { abilitySaga, pokemonDetailSaga, pokemonSaga, typeDetailSaga, typesSaga } from '.';
export default function* rootSaga() {
	yield all([pokemonSaga(), pokemonDetailSaga(), abilitySaga(), typeDetailSaga(), typesSaga()]);
}
