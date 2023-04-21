import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, take } from 'redux-saga/effects';
import { Ability, fallbackAbility } from '../../models';
import { abilityService } from '../../services/ability-service';
import { abilityAction } from '../reducers/ability-slice';

function* getAbility(ability: string) {
	try {
		const response: Ability = yield call(abilityService.getAbility, ability);
		return response;
	} catch (e) {
		if (e instanceof Error) {
			throw e;
		} else {
			console.log(e);
		}
	}
}

function* getAbilities(abilities: string[]) {
	try {
		const response: Ability[] = yield all(abilities.map((a) => call(getAbility, a)));
		const results = response.map((res) => {
			if (res === undefined) {
				return fallbackAbility;
			}
			return res;
		});
		yield put(abilityAction.completeGettingAbilities(results));
	} catch (e) {
		if (e instanceof Error) {
			yield put(abilityAction.errorGettingAbilities(e.message));
		} else {
			alert('Error when fetching abilities');
		}
	}
}

function* getAbilitiesWatcher() {
	while (true) {
		const action: PayloadAction<string[]> = yield take(abilityAction.requestGettingAbilities.type);
		yield call(getAbilities, action.payload);
	}
}
export function* abilitySaga() {
	yield all([getAbilitiesWatcher()]);
}
