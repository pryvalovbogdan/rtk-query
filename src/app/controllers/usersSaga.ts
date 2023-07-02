import { takeLatest, put } from 'redux-saga/effects';

import { USER_ACTIONS } from '../constants';
import { api } from '../services/api';

export function* watchUserSaga() {
  yield takeLatest(USER_ACTIONS.GET_USERS, handleGetUsers);
}

export function* handleGetUsers(payload) {
  try {
    console.log('payload', payload);

    yield put(
      // @ts-ignore  // For fetchBaseQuery use undefined for axiosBaseQuery use null
      api.util.updateQueryData('getPosts', null, (draftPosts = []) => {
        return [...draftPosts, { id: Date.now(), title: 'New Post', body: 'This is a new post.' }];
      }),
    );
  } catch (error) {
    console.log('error:', error);
  }
}
