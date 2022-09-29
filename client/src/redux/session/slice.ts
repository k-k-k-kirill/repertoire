import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionState } from "./types";

export const session = createSlice({
  name: "session",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    // Saga actions
    sagaSetIsAuthenticated(
      state: SessionState,
      action: PayloadAction<boolean>
    ) {
      state.isAuthenticated = action.payload;
    },

    // Ui actions
    uiSetIsAuthenticated(state: SessionState, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

// Action creators
export const { sagaSetIsAuthenticated, uiSetIsAuthenticated } = session.actions;

// Selectors
export const getIsAuthenticated = (state: any) =>
  state.session.isAuthenticated &&
  sessionStorage.getItem("accessToken") &&
  sessionStorage.getItem("refreshToken");

export default session.reducer;
