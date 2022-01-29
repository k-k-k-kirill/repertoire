import { call, all, spawn } from "redux-saga/effects";
import openingsSagas from "./openings/sagas";

export default function* rootSaga() {
  const sagas = [...openingsSagas];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error("Error in saga " + saga.name + ": " + e);
          }
        }
      })
    )
  );
}
