import { select } from '@redux-saga/core/effects';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { TypedUseSelectorHook } from 'react-redux/es/types';
import { AppDispatch, RootState } from './Store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function* appSelect<TSelected>(selector: (state: RootState) => TSelected): Generator<any, TSelected, TSelected> {
	return yield select(selector);
}
