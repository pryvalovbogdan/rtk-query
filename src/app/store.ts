import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { api } from './services/api'
import storeReducer from './reducer';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({
  collapsed: true,
});

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore<any>({
    reducer: {
      storeReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware, api.middleware),
    ...options,
  })

export const store = createStore()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
