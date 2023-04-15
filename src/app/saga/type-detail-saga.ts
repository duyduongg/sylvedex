import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, take } from 'redux-saga/effects';
import { NamedApiResource, Pokemon, Type } from '../../models';
import { typeService } from '../../services/type-service';
import { typeDetailActions } from '../reducers/type-slice';
import { getPokemonsDataFromNamedApiResource, updatePokemonsData } from './pokemon-saga';

function* getTypeDetail(name: string) {
	try {
		const type: Type = yield call(typeService.getTypeDetail, name);
		yield put(typeDetailActions.completeGettingTypeDetail(type));
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
		} else {
			yield put(typeDetailActions.failedGettingTypeDetail("An error occured while getting type's info"));
		}
	}
}

function* getTypeDetailWatcher() {
	while (true) {
		const action: PayloadAction<string> = yield take(typeDetailActions.requestGettingTypeDetail.type);
		yield call(getTypeDetail, action.payload);
	}
}

export function* typeDetailSaga() {
	yield all([getTypeDetailWatcher()]);
}
