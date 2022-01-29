import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import openings from "./openings/slice";
import rootSaga from "./rootSaga";

const saga = createSagaMiddleware();

export default configureStore({
  reducer: {
    openings,
  },
  middleware: [saga],
  devTools: process.env.NODE_ENV !== "production",
});

saga.run(rootSaga);
