import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { Branch } from "../../types/types";
import { BranchState, ModifyBranchActionPayload } from "./types";
import rightHandMergeState from "../utils/rightHandMergeState";
import organizeById from "../utils/organizeById";

export const branches = createSlice({
  name: "branches",
  initialState: {
    current: null,
    byId: {},
    list: [],
  },
  reducers: {
    // UI Actions
    uiFetchOpenings() {},

    uiAddBranch(state: BranchState, action: PayloadAction<Branch>) {},
    sagaAddBranchComplete(state: BranchState, action: PayloadAction<Branch>) {
      if (action.payload._id) {
        const { list, byId } = rightHandMergeState<Branch>(state, [
          action.payload,
        ]);

        state.list = list;
        state.byId = byId;
      }
    },

    uiModifyBranch(
      state: BranchState,
      action: PayloadAction<ModifyBranchActionPayload>
    ) {},
    sagaModifyBranchComplete(
      state: BranchState,
      action: PayloadAction<Branch>
    ) {
      const { list, byId } = rightHandMergeState<Branch>(state, [
        action.payload,
      ]);

      state.list = list;
      state.byId = byId;
    },

    sagaClearChildBranches(state: BranchState, action: PayloadAction<string>) {
      const list = state.list.filter(
        (item: Branch) => item.parent !== action.payload
      );
      const byId = organizeById(list);

      state.list = list;
      state.byId = byId;
    },

    // Saga Actions
    sagaFetchOpenings() {},
    sagaFetchOpeningsComplete(
      state: BranchState,
      action: PayloadAction<Branch[]>
    ) {
      const { list, byId } = rightHandMergeState<Branch>(state, action.payload);

      state.list = list;
      state.byId = byId;
    },

    sagaFetchBranches() {},
    sagaFetchBranchesComplete(
      state: BranchState,
      action: PayloadAction<Branch[]>
    ) {
      const { list, byId } = rightHandMergeState(state, action.payload);

      state.list = list;
      state.byId = byId;
    },

    uiSetCurrentBranch: (
      state: BranchState,
      action: PayloadAction<string>
    ) => {},
    sagaSetCurrentBranch: (
      state: BranchState,
      action: PayloadAction<string>
    ) => {
      state.current = action.payload;
    },

    uiFetchByParentId: (
      state: BranchState,
      action: PayloadAction<{
        parentId: string;
      }>
    ) => {},
    sagaFetchByParentIdComplete: (
      state: BranchState,
      action: PayloadAction<{ branches: Branch[] }>
    ) => {
      const { list, byId } = rightHandMergeState(
        state,
        action.payload.branches
      );

      state.list = list;
      state.byId = byId;
    },

    sagaFetchById: (state: BranchState, action: PayloadAction<string>) => {},
    sagaFetchByIdComplete: (
      state: BranchState,
      action: PayloadAction<Branch>
    ) => {
      const { list, byId } = rightHandMergeState(state, [action.payload]);

      state.list = list;
      state.byId = byId;
    },

    uiClearCurrentBranch: (state: BranchState, action: Action) => {
      state.current = null;
    },
  },
});

// Action creators
export const {
  uiSetCurrentBranch,
  sagaSetCurrentBranch,
  sagaFetchOpeningsComplete,
  uiFetchOpenings,
  uiAddBranch,
  uiModifyBranch,
  sagaFetchOpenings,
  uiFetchByParentId,
  sagaFetchByParentIdComplete,
  sagaFetchBranches,
  sagaFetchBranchesComplete,
  sagaAddBranchComplete,
  sagaFetchByIdComplete,
  sagaFetchById,
  sagaModifyBranchComplete,
  uiClearCurrentBranch,
  sagaClearChildBranches,
} = branches.actions;

// Selectors
export const getAllBranches = (state: any) => state.branches.list;

export const getBranchById = (state: any, branchId: string) =>
  state.branches.byId[branchId];

export const getAllOpenings = (state: any) => {
  return state.branches
    ? state.branches.list.filter(
        (branch: Branch) =>
          branch.parent === null || branch.parent === undefined
      )
    : [];
};

export const getCurrentBranch = (state: any) => {
  const branchId = state.branches.current;

  if (!branchId) return null;

  return getBranchById(state, branchId);
};

export const getChildrenForCurrentBranch = (state: any) => {
  const parentId = state.branches.current;
  const allBranches = state.branches.list;

  if (!parentId || !allBranches) return null;

  return allBranches.filter((branch: Branch) => branch.parent === parentId);
};

export default branches.reducer;
