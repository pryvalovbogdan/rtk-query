import { takeLatest, call, put, select, throttle } from 'redux-saga/effects';

import { USER_ACTIONS } from "../constants";
import usersApi from "../services/users";

export function* watchUserSaga() {
  yield takeLatest(USER_ACTIONS.GET_USERS, handleGetUsers);
}

export function* handleGetUsers(payload) {
  try {
    console.log('payload', payload)
    // const response: any = yield call(usersApi.endpoints.getUsers.initiate);

    yield put(usersApi.endpoints.getUsers.initiate());

    // Use the select method to create a selector
    // This selector gets the current data for the endpoint from the Redux store
    const locationSelector = usersApi.endpoints.getUsers.select();

    // Use the selector to get the location data
    const location = yield select(locationSelector);
    // yield put(setMyInfo(myInfo));
    console.log('location', location)
  } catch (error) {
    console.log('error:', error)
  }
}
