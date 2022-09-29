import { put } from "redux-saga/effects";
import { sagaSetIsAuthenticated } from "../session/slice";

export function* handleTokenRefreshError() {
  yield put(sagaSetIsAuthenticated(false));
}
