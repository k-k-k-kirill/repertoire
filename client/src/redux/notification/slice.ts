import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationState } from "./types";

export const notification = createSlice({
  name: "session",
  initialState: {
    message: "",
  },
  reducers: {
    uiSetNotification(state: NotificationState, action: PayloadAction<string>) {
      state.message = action.payload;
    },

    sagaSetNotification(
      state: NotificationState,
      action: PayloadAction<string>
    ) {
      state.message = action.payload;
    },
  },
});

// Action creators
export const { uiSetNotification, sagaSetNotification } = notification.actions;

// Selectors
export const getNotification = (state: any) => state.notification.message;

export default notification.reducer;
