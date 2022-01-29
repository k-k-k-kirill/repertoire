import {
  UiAction,
  SagaAction,
  UiFetchOpeningsAction,
  SagaFetchOpeningsAction,
} from "./actions";
import { sagaFetchOpeningsComplete } from "./slice";
import { take, call, put } from "redux-saga/effects";
import openingStorage from "../../storage/Opening";
import { Opening } from "../../types/types";

function* openingsSaga() {
  while (true) {
    const action: UiFetchOpeningsAction | SagaFetchOpeningsAction = yield take([
      UiAction.FetchOpenings,
      SagaAction.FetchOpenings,
    ]);

    try {
      switch (action.type) {
        case UiAction.FetchOpenings:
          {
            const openings: Opening[] = yield call(openingStorage.getAll);
            yield put(sagaFetchOpeningsComplete(openings));
          }
          break;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

const openigsSagas = [openingsSaga];

export default openigsSagas;
