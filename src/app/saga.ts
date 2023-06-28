import { all, fork } from 'redux-saga/effects';

import { watchUserSaga } from './controllers/usersSaga';

const sagas = [
  watchUserSaga,
];

export function* rootSaga() {
  yield all(sagas.map(fork));
}
