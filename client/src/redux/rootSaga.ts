import { call, all, spawn } from "redux-saga/effects";
import branchesSagas from "./branches/sagas";

export default function* rootSaga() {
  const sagas = [...branchesSagas];

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
