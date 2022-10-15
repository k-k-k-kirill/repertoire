import { Branch } from "../../types/types";
import { ModifyBranchActionPayload } from "./types";

export enum UiAction {
  FetchOpenings = "branches/uiFetchOpenings",
  AddBranch = "branches/uiAddBranch",
  ModifyBranch = "branches/uiModifyBranch",
  SetCurrent = "branches/uiSetCurrentBranch",
  FetchByParentId = "branches/uiFetchByParentId",
  ClearCurrentBranch = "branches/uiClearCurrentBranch",
}

export enum SagaAction {
  FetchOpenings = "branches/sagaFetchOpenings",
  FetchOpeningsComplete = "branches/sagaFetchOpeningsComplete",
  FetchByParentIdComplete = "branches/sagaFetchByParentIdComplete",
  FetchBranches = "branches/sagaFetchBranches",
  FetchBranchesComplete = "branches/sagaFetchBranchesComplete",
  AddBranchComplete = "branches/sagaAddBranchComplete",
  FetchById = "branches/sagaFetchById",
  FetchByIdComplete = "branches/sagaFetchByIdComplete",
  ModifyBranchComplete = "branches/sagaModifyBranchComplete",
  ClearChildBranches = "branches/sagaClearChildBranches",
}

// Ui actions
export interface UiFetchOpeningsAction {
  type: UiAction.FetchOpenings;
}

export interface UiAddBranchAction {
  type: UiAction.AddBranch;
  payload: Branch;
}

export interface UiModifyBranchAction {
  type: UiAction.ModifyBranch;
  payload: ModifyBranchActionPayload;
}

export interface UiSetCurrentBranchAction {
  type: UiAction.SetCurrent;
  payload: string;
}

export interface UiFetchByParentIdAction {
  type: UiAction.FetchByParentId;
  payload: {
    parentId: string;
  };
}

export interface UiClearCurrentBranch {
  type: UiAction.ClearCurrentBranch;
}

// Saga actions
export interface SagaFetchOpeningsAction {
  type: SagaAction.FetchOpenings;
}

export interface SagaFetchOpeingsActionComplete {
  type: SagaAction.FetchOpeningsComplete;
  payload: {
    openings: Branch[];
  };
}

export interface SagaFetchByParentIdComplete {
  type: SagaAction.FetchByParentIdComplete;
  payload: {
    branches: Branch[];
  };
}

export interface SagaFetchBranchesAction {
  type: SagaAction.FetchBranches;
  payload: {
    branches: Branch[];
  };
}

export interface SagaFetchBranchesCompleteAction {
  type: SagaAction.FetchBranchesComplete;
  payload: {
    branches: Branch[];
  };
}

export interface SagaAddBranchCompleteAction {
  type: SagaAction.AddBranchComplete;
  payload: Branch;
}

export interface SagaFetchByIdAction {
  type: SagaAction.FetchById;
  payload: string;
}

export interface SagaFetchByIdCompleteAction {
  type: SagaAction.FetchByIdComplete;
  payload: Branch;
}

export interface SagaModifyBranchCompleteAction {
  type: SagaAction.ModifyBranchComplete;
  payload: Branch;
}

export interface SagaClearChildBranchesAction {
  type: SagaAction.ClearChildBranches;
  payload: string;
}
