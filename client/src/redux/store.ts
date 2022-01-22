import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import openings from "./slices/openings";

const saga = createSagaMiddleware();

export default configureStore({
  reducer: {
    openings,
  },
  middleware: [saga],
  devTools: process.env.NODE_ENV !== "production",
});
