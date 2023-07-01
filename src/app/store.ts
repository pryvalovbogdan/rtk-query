import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { api } from './services/api';
import storeReducer from './reducer';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
  collapsed: true,
});

export const createStore = (options?: any) =>
  configureStore<any>({
    reducer: {
      storeReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(
        loggerMiddleware,
        sagaMiddleware,
        api.middleware,
      ),
    ...options,
  });

export const store = createStore();

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
