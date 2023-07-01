import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IStoreState } from './types';
import { DEFAULT_STATE } from './constants';
import { getUsers } from './services/usersApi';

const storeReducer = createSlice({
  name: 'reducerStore',
  initialState: <IStoreState>DEFAULT_STATE,
  reducers: {
    actionSetIsLoading(state: IStoreState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    actionSetUsers(state: IStoreState, action: PayloadAction<any[]>) {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(getUsers.matchFulfilled, (state: IStoreState, action) => {
      state.users = action.payload;
    });
  },
});

export const { actionSetIsLoading, actionSetUsers } = storeReducer.actions;

export default storeReducer.reducer;
