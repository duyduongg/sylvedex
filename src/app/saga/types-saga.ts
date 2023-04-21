import { all, call, put, take } from 'redux-saga/effects';
import { NamedApiResourceList } from '../../models';
import { typeService } from '../../services/type-service';
import { typesActions } from '../reducers/type-slice';

function* getTypes() {
	try {
		const data: NamedApiResourceList = yield call(typeService.getTypes);

		// Remove SHADOW and UNKNOWN type (2 unofficial types) from list
		yield put(typesActions.completeGettingTypes(data.results.slice(0, data.results.length - 2)));
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
		} else {
			yield put(typesActions.failedGettingTypes('An error occured while getting types list'));
		}
	}
}

function* getTypesWatcher() {
	while (true) {
		yield take(typesActions.requestGettingTypes.type);
		yield call(getTypes);
	}
}

export function* typesSaga() {
	yield all([getTypesWatcher()]);
}
