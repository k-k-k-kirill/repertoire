import { createSlice } from "@reduxjs/toolkit";

export const openings = createSlice({
  name: "openings",
  initialState: {
    current: null,
    byId: {},
    list: [],
  },
  reducers: {
    setCurrentOpening: (state, action) => {
      state.current = action.payload.opening;
    },
  },
});

export const { setCurrentOpening } = openings.actions;

export default openings.reducer;
