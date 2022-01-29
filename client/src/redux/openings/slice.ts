import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Opening } from "../../types/types";
import { OpeningsState } from "./types";

export const openings = createSlice({
  name: "openings",
  initialState: {
    current: null,
    byId: {},
    list: [],
  },
  reducers: {
    // UI Actions
    uiFetchOpenings() {},

    // Saga Actions
    sagaFetchOpeningsComplete(
      state: OpeningsState,
      action: PayloadAction<Opening[]>
    ) {
      const openings: Opening[] = action.payload;
      let openingsById: Record<string, Opening> = {};

      openings.forEach((opening: Opening) => {
        const id = opening._id;
        openingsById[id] = opening;
      });

      state.list = openings;
      state.byId = openingsById;
    },
    setCurrentOpening: (
      state: OpeningsState,
      action: PayloadAction<Opening>
    ) => {
      state.current = action.payload._id;
    },
  },
});

// Action creators
export const { setCurrentOpening, sagaFetchOpeningsComplete, uiFetchOpenings } =
  openings.actions;

// Selectors
export const getAllOpenings = (state: any) => state.openings.list;

export default openings.reducer;
