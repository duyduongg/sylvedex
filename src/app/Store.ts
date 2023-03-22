import createSagaMiddleware from '@redux-saga/core';
import { Action, AnyAction, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { rootReducer, RootReducer } from './reducers/RootReducer';
import rootSaga from './saga/RootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer<RootReducer, AnyAction>(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
