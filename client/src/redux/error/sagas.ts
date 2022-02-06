import { put } from "redux-saga/effects";
import { sagaSetIsAuthenticated } from "../session/slice";

export function* handleError() {
  yield put(sagaSetIsAuthenticated(false));
}
