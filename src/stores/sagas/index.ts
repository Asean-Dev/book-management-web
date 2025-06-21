import { all, fork } from "redux-saga/effects";

import { watchBooks } from "./books";

export default function* rootSaga() {
  yield all([fork(watchBooks)]);
}
