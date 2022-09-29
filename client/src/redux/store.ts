import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import session from "./session/slice";
import notification from "./notification/slice";
import branches from "./branches/slice";
import rootSaga from "./rootSaga";

const saga = createSagaMiddleware();

export default configureStore({
  reducer: {
    session,
    notification,
    branches,
  },
  middleware: [saga],
  devTools: process.env.NODE_ENV !== "production",
});

saga.run(rootSaga);
